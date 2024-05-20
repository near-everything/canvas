# Running Playwright tests

To be able to run the playwright tests, you first need to install the dependencies. You can see how this is done in .devcontainer/post-create.sh which is automatically executed when opening this repository in a github codespace.

# When the dependencies are set up, you can run the test suite in your terminal:

`cmd yarn test `

To run tests visually in the playwright UI, you can use the following command:

`cmd yarn test:ui`

This will open the playwright UI in a browser, where you can run single tests, and also inspect visually.

If you want to use the playwright UI from a github codespace, you can use this command:

`cmd yarn test:ui:codespaces`

In general it is a good practice, and very helpful for reviewers and users of this project, that all use cases are covered in Playwright tests.It is encouraged to include video in pull requests in order to demonstrate functionality and prove thorough testing. Also, when contributing, try to make your tests as simple and clear as possible, so that they serve as examples on how to use the functionality.
