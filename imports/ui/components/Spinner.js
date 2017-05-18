import React from 'react';
import { branch, renderComponent } from 'recompose';

const Spinner = () => <div>SUPER LOADER!</div>;

const spinnerWhileLoading = isLoading =>
  branch(isLoading, renderComponent(Spinner));

export default spinnerWhileLoading;
