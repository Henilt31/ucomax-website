// static product finder config
export const industries = [
  'Aerospace',
  'Automotive',
  'Manufacturing',
  'Oil & Gas',
  'Foundry',
  'Research Lab',
  'Education'
]

export const applications = [
  'Surface Inspection',
  'Weld Inspection',
  'Material Testing',
  'Microscopy',
  'Camera Inspection',
  'Quality Control'
]

export const requirements = [
  'Portable',
  'High Accuracy',
  'Automation',
  'Budget Friendly',
  'Research Grade'
]

// simple mapping rules from choices to matching products
export function findProducts(industry, application, requirement) {
  // Let's filter products according to logic
  // Returns list of matching product slugs
  if (application === 'Microscopy') {
    if (requirement === 'Portable') {
      return ['portmet', 'mobiscope']
    } else if (requirement === 'Budget Friendly') {
      return ['metscope-prime', 'monoscope-prime', 'stereo-prime']
    } else if (requirement === 'Research Grade' || requirement === 'High Accuracy') {
      return ['metscope-pro', 'metscope-vista', 'metscope-ultra', 'visionedge-ultra']
    }
    return ['metscope-prime', 'metscope-pro', 'stereo-promet']
  }

  if (application === 'Camera Inspection') {
    if (requirement === 'High Accuracy' || requirement === 'Research Grade') {
      return ['digicam-20mp-usb-3-0', 'digicam-4k-usb-3-0-hdmi']
    }
    return ['digicam-5mp-usb-3-0', 'digicam-lcd', 'digicam-tablet']
  }

  if (application === 'Weld Inspection') {
    if (requirement === 'Automation') {
      return ['protrack-scanner']
    } else if (requirement === 'Portable') {
      return ['ac-yoke', 'battery-operated-yoke', 'uco-lite-scanner']
    }
    return ['ac-yoke', 'ac-dc-yoke', 'uco-ls-scanner', 'standard-wedges']
  }

  if (application === 'Surface Inspection') {
    if (requirement === 'Portable') {
      return ['battery-operated-yoke', 'permanent-yoke', 'uco-lite-scanner']
    }
    return ['ac-yoke', 'ac-dc-yoke', 'uv-lights', 'protrack-scanner']
  }

  if (application === 'Material Testing' || application === 'Quality Control') {
    if (requirement === 'High Accuracy') {
      return ['iiw-type-1-block-v1-block', 'step-blocks', 'visionedge-plus']
    } else if (requirement === 'Portable') {
      return ['battery-operated-yoke', 'v2-block', 'uco-lite-scanner']
    }
    return ['iiw-type-1-block-v1-block', 'standard-wedges', 'metscope-prime']
  }

  // fallback logic
  return ['ac-yoke', 'metscope-prime', 'digicam-5mp-usb-3-0']
}
