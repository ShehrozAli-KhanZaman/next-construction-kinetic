export const DROPDOWN_CONFIG = {
  city: {
    label: 'City',
    placeholder: 'Select City',
    enabled: true,
    clearOnChange: ['area', 'sector', 'plotNumber']
  },
  area: {
    label: 'Area / Phase',
    placeholder: 'Select Area',
    enabledWhen: 'city',
    clearOnChange: ['sector', 'plotNumber']
  },
  sector: {
    label: 'Sector',
    placeholder: 'Select Sector',
    enabledWhen: 'area',
    clearOnChange: ['plotNumber']
  },
  plotNumber: {
    label: 'Plot Number',
    placeholder: 'Select Plot',
    enabledWhen: 'sector',
    clearOnChange: []
  }
};

export const STYLE_CONFIG = {
  container: 'grid grid-cols-2 lg:grid-cols-4 gap-1.5 sm:gap-4',
  dropdown: 'w-full px-1.5 py-1 sm:px-3 sm:py-2 border-0 rounded-sm text-xs sm:text-base text-black bg-white focus:outline-none disabled:bg-gray-100 disabled:cursor-not-allowed',
  label: 'block text-xs font-medium text-gray-700 mb-1',
  wrapper: 'flex flex-col'
};
