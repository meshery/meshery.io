---
title: Mesheryctl End-To-End Testing introduction
subheading: Validate Mesehry's CLI behavior
author: Matthieu EVRIN
date: 2025-10-30 08:00:00 -0500
categories: 
  - mesheryctl
  - test
redirect_from: /blog/2025-10-30-mesheryctl-e2e-introduction
---

Introducing mesheryctl End-To-End testing using **B**ash **A**utomating **T**esting **S**ystem (**BATS**).

## Context

You wanted to create a test for a new or existing command, this tutorial will explain you how to achieve it.

## Understand Meshery ecosystem

The best advice that we can share is first of all, **be familiarized with Meshery ecosystem**, this is the key to be able to implement tests.

Be familiar with the different components and concept in Meshery's world, this can be done by reading the official documentation.

You will find detailed explanation of the architecture and logical concepts there:

- **Architecture:** https://docs.meshery.io/concepts/architecture
- **Logical:**: https://docs.meshery.io/concepts/logical

**mesheryctl** is the Meshery's CLI

It is a CLI built in Golang that interact with Meshery server API. By creating End-To-End tests during the development lifecycle, it's ensure that changes or new features are behaving as expected.

## How to create a test

Before starting be sure you read the contributing guide that will provide you the requirements and the implementation standards.

- **Guide:** https://docs.meshery.io/project/contributing/contributing-cli-tests


### Scenario

We will use a fictive comannd named `awesome` through this tutorial that have 3 subcommands `create`, `list` and `view` that need to be tested. Now, let's define how they should behave to implement the test.

**Subcommands behavior excepted:**

- **create:**
  ```
  # Create `test`
  ~$ mesheryctl awesome create test
  test has been created successfuly

  # Create missing argument
  ~$ mesheryctl awesome create
  Error: no name was provided. 
  Please provide the name that you want to create
  ```

- **list:**
  ```
  ~$ mesheryctl awesome list
  Total number of elements: 3
  Page: 1
  NAME     DESCRIPTION
  test     description of test
  test-1   description of test 1
  test-2   description of test 2
  ```

- **view:**
  ```
  # View `test-creation`
  ~$ mesheryctl awesome create test
  Name: test

  # View missing argument
  ~$ mesheryctl awesome view
  Error: no name was provided. 
  Please provide the name that you want to view

  # View no existing elements
  ~$ mesheryctl awesome view non-existing
  No element with name "non-existing" has been found. 
  Ensure to provided an existing name. `mesheryctl awesome list` to list existing elenent.
  ```

All is set now to create required tests.

### Folder structure

All End-To-End tests are stored in `mesheryctl/tests/e2e`


```
tests/
└── e2e
    ├── 000-prerequisites
    ├── 001-system
    ├── 002-model
    ├── 003-design
    ├── 004-perf
    ├── 005-component
    └── helpers

8 directories
```

### Implementation

You need to create a new folder that will contains all the tests for this command.

Following the implementation standard, the folder will be `tests/e2e/006-awesome`, then we will create a file for each subcommands, this is the expected result

```
tests/
└── e2e
    ├── 000-prerequisites
    ├── 001-system
    ├── 002-model
    ├── 003-design
    ├── 004-perf
    ├── 005-component    
    ├── 006-awesome
    │   ├── 00-awesome.bats
    │   ├── 01-awesome-create.bats
    │   ├── 02-awesome-list.bats
    │   └── 03-awesome-view.bats
    └── helpers
```

#### Create

Content of 01-awesome-create.bats

```
#!/usr/bin/env bats

# Add helpers functions to not reinvent the wheel
setup() {
   load "$E2E_HELPERS_PATH/bats_libraries"
	_load_bats_libraries
}

@test "create command without arguments fails" {
  run $MESHERYCTL_BIN awesome create
   
  
  assert_failure
  assert_output --partial "Error: no name was provided."
  assert_output --partial "Please provide the name that you want to create"
}

@test "create command with argument succeed" {
  run $MESHERYCTL_BIN awesome create test
   
  assert_success
  
  assert_output "Name: test-creation"
}
```

#### List

Content of 02-awesome-list.bats

```
#!/usr/bin/env bats

# Add helpers functions to not reinvent the wheel
setup() {
   load "$E2E_HELPERS_PATH/bats_libraries"
	_load_bats_libraries
}

@test "list command succeed" {
  run $MESHERYCTL_BIN awesome list   
  
  assert_success
  
  assert_output --partial Total number of elements: 3
  assert_output --partial Page: 1
  assert_output --partial NAME     DESCRIPTION
  assert_output --partial test     description of test
  assert_output --partial test-1   description of test 1
  assert_output --partial test-2   description of test 2
}
```

#### View

Content of 03-awesome-view.bats

```
#!/usr/bin/env bats

# Add helpers functions to not reinvent the wheel
setup() {
   load "$E2E_HELPERS_PATH/bats_libraries"
	_load_bats_libraries
}

@test "view command without arguments fails" {
  run $MESHERYCTL_BIN awesome view
   
  
  assert_failure
  assert_output --partial "Error: no name was provided."
  assert_output --partial "Please provide the name that you want to view"
}

@test "view command with existing awesome name is displaying name" {
  run $MESHERYCTL_BIN awesome view test
   
  assert_success
  
  assert_output "Name: test"
}

@test "view command with non-existing awesome name is displaying non existing message" {
  run $MESHERYCTL_BIN awesome view non-existing
   
  assert_success
  
  assert_output  --partial "No element with name "non-existing" has been found."
  assert_output  --partial "Ensure to provided an existing name. `mesheryctl awesome list` to list existing elenent."
}
```

### Run added End-To-End tests

Now you have create a new suite of tests, you can confirm it is working as expected running the following command and see an example of output

```
~/mesheryctl/ $ make e2e-no-build BATS_FOLDER_PATTERN=006-awesome


#### MESHERYCTL END-TO-END TESTING - START ####

00-awesome.bats
01-awesome-create.bats
 ✓ create command without arguments fails
 ✓ create command with argument succeed
02-awesome-list.bats
 ✓ list command succeed
02-awesome-view.bats
 ✓ view command without arguments fails
 ✓ view command with existing awesome name is displaying name
 ✓ view command with non-existing awesome name is displaying non existing message

 6 tests, 0 failures


#### MESHERYCTL END-TO-END TESTING - DONE ####
```

## Conclusion

You now have a small, repeatable e2e test suite for your imaginary `awesome` command. Practice:
- keep tests small and independent,
- use the helpers to avoid duplication,
- prefer deterministic assertions (exact when possible, partial when needed),
- and run them locally before pushing so CI stays happy.

If a test fails: write a better assertion, fix the bug, or add a regression test. Rinse and repeat.

Happy testing — may your CI logs be short and your green checks plentiful.


