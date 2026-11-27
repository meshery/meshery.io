---
title: "From 110 Hardcoded UUIDs to Zero: How Meshery's Permission System Became Self-Updating"
subheading: "Refactoring authorization at scale with schema-driven permission keys and PermissionShield"
date: 2026-08-02
author: Rishi Raj
categories:
  - security
  - architecture
  - extensibility
featured-image: /assets/images/posts/2026/08/permission-key-migration/permission-key-migration.png
redirect_from: /blog/permission-key-migration
published: true
---

A user logs into [Meshery](https://meshery.io), navigates to the sidebar, and sees Credentials greyed out. They click a workspace button - nothing happens. Half the performance dashboard is unresponsive. No tooltip. No error. No hint about what's wrong or who to contact.

Meanwhile, in the codebase, a 449-line file full of hand-copied UUIDs is silently referencing permission keys the server deprecated two months ago. Nobody noticed because the failure mode is silence.

This is the story of how I killed that file, gave users clear feedback when features are restricted, and connected the UI to an automated pipeline that makes the entire permission system self-updating.

---

## 110 UUIDs, Zero Validation

Every permission check in Meshery's UI depended on `ui/utils/permission_constants.js`. It looked like this:

```js
export const keys = {
  VIEW_ALL_ORGANIZATIONS: {
    subject: 'View All Organizations',
    action: 'e996c998-a50f-4cb8-ae7b-f2f1b523c971',
  },
  EDIT_WORKSPACE: {
    subject: 'Edit Workspace',
    action: '4112230f-5d1e-4d30-9790-942ad5c1dc50',
  },
  DELETE_CREDENTIAL: {
    subject: 'Delete Credential',
    action: 'cb09f530-aa87-4a18-b3d3-bbcc2d6ca1a6',
  },
  // ... 107 more entries, each UUID copied by hand
};
```

449 lines. 110 UUIDs. Every single one typed or pasted by a human.

The server's authoritative permission list lives in a Google Spreadsheet - 107+ entries managed by maintainers. A daily GitHub Actions workflow ([`generate_keys.yml`](https://github.com/meshery/meshery/blob/master/.github/workflows/generate_keys.yml)) downloads that spreadsheet as CSV, commits it to `server/permissions/keys.csv`, and the server reads it at runtime. That pipeline works. It's been working.

But the UI was never connected to it. The UI had its own handwritten copy of every UUID. Two sources of truth, always drifting.

### What goes wrong

You rotate a UUID on the server side. The spreadsheet updates. The nightly workflow propagates the change. The server is fine. The UI? Still hardcoding the old UUID. No compile error. No lint warning. The `CAN()` check silently returns the wrong answer - either blocking users who should have access, or letting through users who shouldn't.

You add a new permission - say, "Evaluate Relationships." Someone has to find the UUID, copy-paste it into `permission_constants.js`, make sure the `subject` string matches exactly, open a PR, get it reviewed, merge it. Miss one step and the UI can't gate on that permission at all.

A typo in a UUID (`...c972` instead of `...c971`) compiles fine, passes linting, and fails silently at runtime. While the backend server always enforces authorization independently on every API endpoint, a mismatched client-side key degrades the user experience — either unnecessarily blocking valid features or letting users click buttons only to have the backend reject the request.

---

## "Why Is This Button Greyed Out?"

Hardcoded UUIDs weren't the only problem. There was a UX problem just as bad.

Before this refactoring, the permission pattern looked like this:

```tsx
<Button disabled={!CAN(keys.EDIT_WORKSPACE.action, keys.EDIT_WORKSPACE.subject)}>
  Edit Workspace
</Button>
```

The button goes grey. That's the entire user experience.

No tooltip explaining what permission is missing. No indication of which role you'd need. No guidance on who to contact in your organization. You're a new team member who just joined a Meshery org, and half the UI just... doesn't respond. You don't know if it's a bug, a network issue, or something about your account.

This creates three outcomes, all bad:

1. **Support tickets.** Users report "broken" features that are actually working exactly as intended - they just don't have the right role.
2. **Abandonment.** Users give up on the platform because it feels buggy.
3. **Workarounds.** Users ask admins to grant broad permissions because they can't tell which specific permission they need.

### What users actually need

When you encounter a disabled feature, you need answers to four questions:

- **What** is restricted? The specific action name - not a generic "access denied."
- **Why** is it restricted? Which permission is missing from your role.
- **Who am I here?** Your name, your organization, your current role context.
- **What do I do about it?** Contact your org admin. Request this specific permission.

Without those answers, a disabled button is a dead end.

---

## The Fix: Schema-Driven Keys + PermissionShield

The refactoring had two goals: eliminate the hardcoded UUIDs by connecting the UI to the existing automated pipeline, and give users clear feedback when features are restricted through PermissionShield.

### Killing the hardcoded file

The [`@meshery/schemas`](https://github.com/meshery/schemas) package already generates a typed `Keys` object from the same authoritative data the server uses. Each key is a structured object with `id` and `function` fields - not a flat string you can silently mistype:

```tsx
import { Keys } from '@meshery/schemas/permissions';

// Keys.WorkspaceManagementEditWorkspace -> { id: "4112230f-...", function: "Edit Workspace" }
// Keys.SecurityManagementDeleteCredential -> { id: "cb09f530-...", function: "Delete Credential" }
```

The UUIDs in schemas are generated, not hand-written. When the spreadsheet updates and the schema package rebuilds, the keys update automatically.

I mapped all 110 legacy `SCREAMING_SNAKE_CASE` monikers to their schema `PascalCase` equivalents, migrated every consumer file-by-file, verified the mapping accuracy with unit tests against generated schema metadata, and deleted the 449-line file.

If someone references a key name that doesn't exist on `Keys`, TypeScript catches the missing property at build time. No more silent runtime failures.

### Wiring up PermissionShield

[Sistent](https://github.com/meshery/sistent) - Meshery's shared design system - provides `PermissionProvider` and `PermissionShield`. I integrated them at the app root in `_app.tsx`:

```tsx
const permissionUserContext = useMemo(() => ({
  userName: [firstName, lastName].filter(Boolean).join(' ') || loggedInUser?.email,
  orgName: providerCapabilities?.providerName || '',
  roleNames: loggedInUser?.roleNames || [],
}), [loggedInUser, providerCapabilities?.providerName]);

<PermissionProvider
  userHasPermission={userHasPermission}
  userContext={permissionUserContext}
>
  <App />
</PermissionProvider>
```

`orgName` uses the provider's registration organization name - not whichever org the user last switched to. This matters in multi-org scenarios where the permission context must reflect the correct organizational scope.

With this in place, Sistent's enhanced components (`Button`, `IconButton`, etc.) accept a `permissionKey` prop. When the user lacks the required permission, the component:

- Disables itself automatically
- Shows a rich tooltip on hover with the permission name, the user's identity, their org, and guidance on requesting access

```tsx
// Before - user sees grey button, no explanation:
<IconButton disabled={!CAN(keys.EDIT_WORKSPACE.action, keys.EDIT_WORKSPACE.subject)}>
  <EditIcon />
</IconButton>

// After - user sees why it's disabled and what to do:
<IconButton permissionKey={Keys.WorkspaceManagementEditWorkspace}>
  <EditIcon />
</IconButton>
```

That single change transforms a confusing dead-end into an actionable path.

### The PermissionInfo tooltip - the first iteration

Before the full PermissionShield integration, I built a standalone `PermissionInfo` component to test the concept:

{% raw %}
```tsx
export const PermissionInfo = ({ permissionId }) => {
  const metadata = getPermissionMetadata(permissionId);
  return (
    <CustomTooltip
      title={
        <Box>
          <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
            {metadata?.function || 'Action'}
          </Typography>
          <Typography variant="caption" sx={{ color: 'warning.main' }}>
            Access is unavailable because the required permission is not assigned.
          </Typography>
        </Box>
      }
    >
      <IconButton size="small">
        <InfoIcon width={16} height={16} />
      </IconButton>
    </CustomTooltip>
  );
};
```
{% endraw %}

I deployed this in the sidebar Navigator. When a user couldn't access Credentials, a small info icon appeared next to the greyed-out menu item explaining the restriction:

{% raw %}
```tsx
{isCredentialDisabled && !isDrawerCollapsed && (
  <PermissionInfo
    permissionId={keys.VIEW_CREDENTIALS.action}
    style={{ position: 'absolute', right: '12px', zIndex: 2 }}
  />
)}
```
{% endraw %}

This validated the approach. The full `permissionKey` prop integration then made it universal across 50+ components without requiring a separate info icon for each one.

---

## 50+ Components, One Pattern

The migration touched every interactive surface in the UI. Every button, icon button, and action that previously did manual `disabled={!CAN(...)}` was converted to the declarative `permissionKey` prop.

| Area | What moved |
|------|-----------|
| Lifecycle | Connections table, Connection wizard, Credentials, Environments, Workspaces, Adapters |
| Configuration | Designs, Catalog |
| Performance | Profiles, Dashboard, Cards, Form actions |
| Telemetry | Metrics, Charts |
| Layout | Navigator sidebar (15+ items), Header, Extensions |
| Dashboard | Getting started, Kubernetes charts, MeshModel graphs, Workload charts |

For cases where the required permission depends on runtime context, I created focused hooks. The connection wizard needs different permissions based on the connection kind:

```tsx
export const useKindPermission = () => {
  const canAddCluster = useHasPermission(Keys.LifecycleManagementAddCluster);
  const canConnectMetrics = useHasPermission(Keys.MesherySystemConnectMetrics);

  return (config?: ConnectionWizardKindConfig | null) => {
    if (!config) return false;
    return config.flow === 'kubernetes' ? canAddCluster : canConnectMetrics;
  };
};
```

Every navigator item now carries a `permissionKey`:

```tsx
{
  id: CONNECTION,
  href: '/management/connections',
  title: 'Connections',
  permissionKey: Keys.WorkspaceManagementViewConnections,
},
{
  id: CREDENTIAL,
  href: '/management/credentials',
  title: 'Credentials',
  permissionKey: Keys.SecurityManagementViewCredentials,
},
```

---

## The Pipeline, End-to-End

Zero manual work from spreadsheet to rendered UI:

```text
Google Spreadsheet (107+ permission entries)
        │
        │  Daily cron - generate_keys.yml
        ▼
server/permissions/keys.csv  (auto-committed)
        │
        │  Schema build & release workflow
        ▼
@meshery/schemas/permissions  (published NPM package with typed Keys object)
        │
        │  npm / go dependency update
        ▼
Meshery UI & Server
  ├─ PermissionProvider  (user context: name, org, roles)
  ├─ permissionKey={Keys.Xxx}  (auto-disable + rich tooltip)
  └─ useHasPermission(Keys.Xxx)  (imperative checks)
```

Add a permission in the spreadsheet. The nightly workflow picks it up and commits the updated CSV. When `@meshery/schemas` is published and updated in `package.json`, the UI gains access to the new key immediately.

Remove a permission from the spreadsheet. The schema package drops the property on `Keys`. Rebuilding the UI flags any leftover references with a TypeScript compile error. No silent failures.

---

## Testing the Authorization Boundary

Every migrated component got updated tests. The tests verify the authorization behavior, not the UUID string:

```tsx
it('disables buttons when the user lacks permission', () => {
  CAN_mock.mockReturnValue(false);
  render(<AdapterCategoryCard {...buildProps({ cat: 0 })} />);
  expect(screen.getByTestId('icon-button-install')).toBeDisabled();
  expect(screen.getByTestId('icon-button-delete')).toBeDisabled();
});

it('respects the permissionKey prop', async () => {
  can.mockReturnValue(false);
  const mockKey = { id: 'view-connections', function: 'ViewConnections' };
  render(
    <TransferButton title="Connections" count={1}
      onAssign={onAssign} permissionKey={mockKey} />,
  );
  const btn = screen.getByTestId('popup-button');
  expect(btn).toBeDisabled();
  await user.click(btn);
  expect(onAssign).not.toHaveBeenCalled();
});
```

20+ test files updated. If the shape of a key changes in schemas, the mock breaks and the test tells you.

---

## What Changed

| Metric | Before | After |
|--------|--------|-------|
| Permission constants file | 449 lines, 110 hardcoded UUIDs | Deleted |
| Source of truth | Manual copy-paste from spreadsheet | Automated pipeline |
| UUID update process | Find UUID, edit file, PR, review, merge | Automatic via `@meshery/schemas` releases |
| Compile-time validation | None | TypeScript errors on missing keys |
| User feedback on disabled features | Greyed-out button, no explanation | Rich tooltip with permission name, user context, and guidance |
| Components using schema keys | 0 | 50+ |
| Files importing `@meshery/schemas/permissions` | 0 | 60+ |
| `useHasPermission` hook usage sites | 0 | 50+ |
| Test files updated | 0 | 20+ |

---

## What I Learned

**Hardcoded identifiers are tech debt that stays quiet until it hurts.** The UUIDs worked right up until they didn't. No monitoring, no validation, no feedback. If two systems need to agree on a value, that value flows from one source - never copied between them.

**Disabling a feature without context is a UX failure.** A greyed-out button creates confusion and support tickets. PermissionShield turns "this doesn't work" into "you need the Edit Environment permission - contact your org admin." One tooltip eliminates an entire category of user frustration.

**The best infrastructure is infrastructure you don't build.** The spreadsheet-to-CSV pipeline already existed. The schemas package already generated typed keys. The UI just wasn't connected. Plugging into an existing pipeline beat building a new one.

**The `permissionKey` prop pattern scales.** When authorization is a prop, it's declarative, visible in JSX, and provides user feedback automatically. When it's a manual `disabled={!CAN(...)}` call, it's easy to get the arguments wrong, forget to add it, or skip the user-facing explanation entirely. New components get permission gating by using the same prop - no separate API to learn.

---

*Rishi Raj is an [LFX Mentorship](https://lfx.linuxfoundation.org/tools/mentorship/) intern and open-source contributor to [Meshery](https://github.com/meshery/meshery), a [CNCF](https://www.cncf.io/) project. If you're interested in contributing, check out the [Meshery Contributing Guide](https://docs.meshery.io/project/contributing) or join the [community Slack](https://slack.meshery.io).*
