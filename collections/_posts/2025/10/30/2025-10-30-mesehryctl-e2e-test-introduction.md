---
title: Mesheryctl End-To-End Testing Introduction
subheading: Validating Meshery's CLI behavior
author: Matthieu EVRIN
date: 2025-10-30 08:00:00 -0500
categories: 
  - mesheryctl
  - test
featured-image: /assets/images/posts/2025/mesheryctl-e2e-introduction/downhill.png
redirect_from: /blog/2025-10-30-mesheryctl-e2e-introduction
---

You want to create a test for a new or existing Meshery command? Good. This tutorial explains how to do so. In this tutorial, we will introduce mesheryctl end-to-end testing using **B**ash **A**utomating **T**esting **S**ystem (**BATS**).

## Understand Meshery ecosystem

The best advice that we can share is first of all, **be familiarized with Meshery ecosystem**, this is the key to be able to implement tests.

Be familiar with the different components and concepts in Meshery's world, this can be done by reading the official documentation where you will find detailed explanations of the both [architectural](https://docs.meshery.io/concepts/architecture) and [logical](https://docs.meshery.io/concepts/logical) concepts.

`mesheryctl` is Meshery's CLI

Meshery CLI is written in Golang built on the Cobra framework and interacts with Meshery Server's [REST API](https://docs.meshery.io/reference/rest-apis). By creating end-to-end tests during the development lifecycle, it ensures that changes or new features are behaving as expected.

## How to create a test

Before starting, be sure you read the contributing guide that will provide you the requirements and the implementation standards [here](https://docs.meshery.io/project/contributing/contributing-cli-tests).

### Scenario

We will use a fictitious command named `awesome` through this tutorial that has 3 subcommands `create`, `list` and `view` that need to be tested. Now, let's define how they should behave to implement the test.

**Subcommands behavior expected:**

- **create:**

  ```shell
  # Create `test`
  ~$ mesheryctl awesome create test
  test has been created successfully

  # Create missing argument
  ~$ mesheryctl awesome create
  Error: no name was provided. 
  Please provide the name that you want to create
  ```

- **list:**

  ```shell
  ~$ mesheryctl awesome list
  Total number of elements: 3
  Page: 1
  NAME     DESCRIPTION
  test     description of test
  test-1   description of test 1
  test-2   description of test 2
  ```

- **view:**

  ```shell
  # View `test`
  ~$ mesheryctl awesome view test
  Name: test

  # View missing argument
  ~$ mesheryctl awesome view
  Error: no name was provided. 
  Please provide the name that you want to view

  # View no existing elements
  ~$ mesheryctl awesome view non-existing
  No element with name "non-existing" has been found. 
  Ensure to provided an existing name. `mesheryctl awesome list` to list existing element.
  ```

All is set now to create required tests.

### Folder structure

All End-To-End tests are stored in `mesheryctl/tests/e2e`


  ```shell
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

You need to create a new folder that will contain all the tests for this command.

Following the implementation standard, the folder will be `tests/e2e/006-awesome`, then we will create a file for each subcommand, this is the expected result

```shell
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

```shell
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

  @test "create command with argument succeeds" {
    run $MESHERYCTL_BIN awesome create test
    
    assert_success
    
    assert_output "Name: test"
  }
```

#### List

Content of 02-awesome-list.bats

```shell
#!/usr/bin/env bats

# Add helpers functions to not reinvent the wheel
setup() {
   load "$E2E_HELPERS_PATH/bats_libraries"
	_load_bats_libraries
}

@test "list command succeeds" {
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

```shell
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
  assert_output  --partial "Ensure to provide an existing name. `mesheryctl awesome list` to list existing element."
}
```

### Run added End-To-End tests

Now you have created a new suite of tests, you can confirm it is working as expected by running the following command and see an example of output

```shell
~/mesheryctl/ $ make e2e-no-build BATS_FOLDER_PATTERN=006-awesome


#### MESHERYCTL END-TO-END TESTING - START ####

00-awesome.bats
01-awesome-create.bats
 ✓ create command without arguments fails
 ✓ create command with argument succeed
02-awesome-list.bats
 ✓ list command succeed
03-awesome-view.bats
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
