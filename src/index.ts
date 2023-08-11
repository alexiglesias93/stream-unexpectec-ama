declare global {
  interface Window {
    fsAttributes: any;
  }
}

window.fsAttributes ||= [];
window.fsAttributes.push([
  'cmsload',
  (listInstances: Array<{ items: Array<{ element: HTMLElement }> }>) => {
    const [listInstance] = listInstances;

    //  Loop through all the items
    // And collect the field that we want to use for the filters

    const { jobTypes, locations } = listInstance.items.reduce(
      (acc, { element }) => {
        const jobTypeElement = element.querySelector('[fs-cmsfilter-field="job-type"]');
        const locationElement = element.querySelector('[fs-cmsfilter-field="location"]');

        if (jobTypeElement?.textContent) {
          acc.jobTypes.add(jobTypeElement.textContent);
        }

        if (locationElement?.textContent) {
          acc.jobTypes.add(locationElement.textContent);
        }

        return acc;
      },
      {
        locations: new Set<string>(),
        jobTypes: new Set<string>(),
      }
    );

    // Grab the radio button template

    // For each location and for each job type, create a new radio button

    // Restart the filters

    window.fsAttributes ||= [];
    window.fsAttributes.push([
      'cmsfilter',
      (filtersInstances) => {
        const [filterInstance] = filtersInstances;

        filterInstance.storeFilters();
      },
    ]);
  },
]);

export {};
