# Near Social VM Types

This repository contains TypeScript type declarations for interacting with the Near Social VM. The types correspond to the API described in the [Near API Documentation](https://docs.near.org/bos/api/home).

## Installation

You can install these types using your preferred package manager:

```bash
npm install --save-dev near-social-vm-types
```

## Usage

Once you've installed the **near-social-vm-types** package, you can import the types in your TypeScript files:

```jsx
import { State, Social, Near } from 'near-social-vm-types';

// Now you can use the imported types in your code
// For example:
const initialState: State.init = { /* initial state object */ };
State.init(initialState);

// And similarly for other namespaces like Social and Near

```

## Documentation

For more detailed information on the available types and their usage, you can refer to the [Near API Documentation](https://docs.near.org/bos/api/home).

## Contributing
Contributions to improve and extend these TypeScript type declarations are welcome! If you find any discrepancies or missing types, feel free to submit a pull request.

## License
This project is licensed under the [MIT License](https://chat.openai.com/LICENSE).
