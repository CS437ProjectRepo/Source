const filters = [
    {
      id: 'featured',
      name: 'Featured',
      options: [
        { value: 'outstanding-ui', label: 'Outstanding UI', checked: false },
        { value: 'outstanding-report', label: 'Outstanding Report', checked: false },
        { value: 'outstanding-testing', label: 'Outstanding Testing', checked: false },
      ],
    },
    {
      id: 'category',
      name: 'Category',
      options: [
        { value: 'Software Engineering', label: 'Software Engineering', checked: false },
        { value: 'Education', label: 'Education', checked: false },
        { value: 'Travel', label: 'Travel', checked: false },
        { value: 'Productivity & Organization', label: 'Productivity & Organization', checked: false },
        { value: 'Fitness & Health', label: 'Fitness & Health', checked: false },
        { value: 'Event Planning', label: 'Event Planning', checked: false },
        { value: 'Social Networking', label: 'Social Networking', checked: false },
        { value: 'Miscellaneous', label: 'Miscellaneous', checked: false },
      ],
    },
    {
      id: 'languages',
      name: 'Programming Languages',
      options: [
        { value: 'JavaScript', label: 'JavaScript', checked: false },
        { value: 'Java', label: 'Java', checked: false },
        { value: 'Python', label: 'Python', checked: false },
        { value: 'PHP', label: 'PHP', checked: false },
        { value: 'HTML', label: 'HTML', checked: false },
        { value: 'CSS', label: 'CSS', checked: false },
        { value: 'ApacheConf', label: 'ApacheConf', checked: false },
      ],
    },
]

export default filters;