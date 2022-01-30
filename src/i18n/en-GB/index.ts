export default {
  notFound: {
    error: 'Oops. Nothing here...',
    btnLabel: 'Go Home',
  },
  toolbar: {
    title: 'Food Planner',
    selectLanguage: 'Choose Language'
  },
  submitLabel: 'Save',
  cancelLabel: 'Close',
  hereLabel: 'here',
  days: {
    0: 'Sunday',
    1: 'Monday',
    2: 'Tuesday',
    3: 'Wednesday',
    4: 'Thursday',
    5: 'Friday',
    6: 'Saturday',
  },
  home: {
    title: 'View list',
    subtitle: 'Valid for',
    generateItemsMsg: 'You did not generate a list. Add some options',
    generateListMsg: 'then generate a list',
  },
  viewAll: {
    title: 'View all options',
    titleEmpty: 'Start adding options',
    emptyMessage: 'Nothing to display. Click on the + button to start adding options.',
  },
  drawer: {
    home: 'Home',
    viewAll: 'View All',
    generate: 'Generate List',
    settings: 'Settings',
  },
  items: {
    title: 'Add options',
    name: 'Name',
    requiredName: 'Please add a name',
    addMore: 'Add another option',
    labelExists: '{name} already exists. Please choose a different name.',
  },
  generate: {
    nextStep: 'Next step',
    prevStep: 'Previous step',
    title: 'Generate a list of options',
    listGenerated: 'List generated',
    emptyListMessage: 'Please add a few options',
    notEnoughItems: 'Please add at least {min} options.',
    step1: {
      stepTitle: 'Generate List',
      title: 'Generate the options list',
      changeDate: 'Change date',
      confirmDate: 'OK',
      lock: 'Keep',
      generate: 'Generate',
    },
    step2: {
      stepTitle: 'Order list',
      title: 'Drag options to desired week day',
      caption: 'Optional'
    },
    step3: {
      stepTitle: 'Add a description',
    },
  },
  settings: {
    title: 'Settings',
    deleteAllData: 'Delete all data',
    populateList: 'Populate list with the default data',
    deleteWarning: 'Are you sure you want to delete all data?',
    confirmDelete: 'Delete all',
    deleteNotification: 'Successfully deleted',
    defaultDataAdded: 'Default data added.',
    viewAllData: 'View all data',
    itemsMessage: {
      noItems: 'You don\'t have any options.',
      oneItem: 'You have one option added.',
      manyItems: 'You have {count} options.',
    },
    listMessage: {
      noList: 'You don\'t have a list yet.',
      oneList: 'You have one list.',
    },
  }
};
