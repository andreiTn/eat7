// This is just an example,
// so you can safely delete all default props below

export default {
  app: {
    title: 'App',
  },
  home: {
    welcomeMessage: 'Hello, {name}!',
  },
  group: {
    leave: {
      modalTitle: 'Leave group {name}',
      modalContent: 'Are you sure you want to leave this group?',
      confirmBtn: 'Confirm',
    },
  },
  items: {
    emptyListMessage: 'No items. Add a few items to begin.',
    noItemsMessage: 'You have no items. Add one now.',
    form: {
      title: 'Add Item',
      openBtnLabel: 'Add Item',
      saveBtnLabel: 'Save',
      name: 'Name',
      requiredName: 'The name is required',
      description: 'Description',
    },
    error: {
      labelExists: 'An item with label {name} already exits.',
    },
  },
  generate: {
    form: {
      title: 'Generate List',
      openBtnLabel: 'Generate List',
      saveBtnLabel: 'Save',
      name: 'Name',
      requiredName: 'The name is required',
      description: 'Description',
    },
  },
  failed: 'Action failed',
  success: 'Action was successful'
};
