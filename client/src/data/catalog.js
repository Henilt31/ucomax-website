export const navData = [
  {
    label: 'NDT Products',
    href: '/category/ndt-products',
    subcategories: [
      {
        label: 'MPT Equipment',
        href: '/subcategory/mpt-equipment',
        items: [
          {
            label: 'Electromagnetic Yoke',
            href: '/subcategory/electromagnetic-yoke',
            products: ['AC Yoke', 'AC/DC Yoke', 'Battery Operated Yoke', 'Permanent Yoke']
          },
          {
            label: 'Light',
            href: '/subcategory/light',
            products: ['UV Lights']
          }
        ]
      },
      {
        label: 'Ultrasonics',
        href: '/subcategory/ultrasonics',
        items: [
          {
            label: 'Encoders',
            href: '/subcategory/encoders',
            products: ['Encoder For Small Diameter Pipe And Tubes', 'U Clamp With Encoder', 'Mini Wheel Encoder']
          },
          {
            label: 'Cable',
            href: '/subcategory/cable',
            products: ['BNC to BNC', 'BNC to Microdot', 'BNC to Right Angled Microdot', 'Mini Lemo 00 to BNC', 'Mini lemo 00 to Microdot', 'Lemo 1 to BNC', 'Lemo 1 to Microdot', 'Lemo 1 to Mini Lemo 00']
          },
          {
            label: 'PAUT Wedges',
            href: '/subcategory/paut-wedges',
            products: ['Standard Wedges', 'High Temperature Wedges upto 150°C']
          }
        ]
      },
      {
        label: 'Blocks and Tubes',
        href: '/subcategory/blocks-and-tubes',
        items: [
          {
            label: 'UT Calibration Block',
            href: '/subcategory/ut-calibration-block',
            products: ['IIW Type 1 Block / V1 Block', 'V2 Block', 'DSC Test Block', 'DC Test Block', 'IIW Type 2 Block / V3 Block', 'Phased Array Calibration Block A', 'PA Navships Block', 'ASTM E2491 PA Assessment Block / Type B', 'ASME Sec V FMC', 'ASME Sec V Pipe Calibration Blocks', 'WCMT Block', 'WCMW Block Piping Calibration Block', 'Step Blocks']
          },
          {
            label: 'Welded Flawed Specimen Validation',
            href: '/subcategory/welded-flawed',
            products: ['Welded Flawed Specimen']
          },
          {
            label: 'Calibration Tubes for Heat Exchanger',
            href: '/subcategory/calibration-tubes',
            products: ['ECT Tubes', 'RFET Tubes', 'NFT Tubes', 'MFL Tubes', 'IRIS Tubes']
          }
        ]
      },
      {
        label: 'Scanners',
        href: '/subcategory/scanners',
        items: [
          {
            label: 'Robotic Scanners',
            href: '/subcategory/robotic-scanners',
            products: ['PROTRACK Scanner']
          },
          {
            label: 'Manual Scanners',
            href: '/subcategory/manual-scanners',
            products: ['UCO LS Scanner', 'UCO Lite Scanner', 'UCO Flex Scanner', 'ORBIT Scanner']
          }
        ]
      },
      {
        label: 'Electromagnetic Testing Probes',
        href: '/subcategory/em-probes',
        items: [
          {
            label: 'ECT Flexible Probes',
            href: '/subcategory/ect-flexible-probes',
            products: ['ECT Flexible Probes']
          },
          {
            label: 'RFET Probes',
            href: '/subcategory/rfet-probes',
            products: ['RFET Probes']
          },
          {
            label: 'NFT Probes',
            href: '/subcategory/nft-probes',
            products: ['NFT Probes']
          },
          {
            label: 'Saturated ECT Probes',
            href: '/subcategory/saturated-ect-probes',
            products: ['Saturated ECT Probes']
          },
          {
            label: 'MFL Probes',
            href: '/subcategory/mfl-probes',
            products: ['MFL Probes']
          }
        ]
      }
    ]
  },
  {
    label: 'Microscope',
    href: '/category/microscope',
    subcategories: [
      {
        label: 'Metallurgical Microscope',
        href: '/subcategory/metallurgical-microscope',
        products: ['Metscope Prime', 'Metscope Pro', 'Metscope Vista', 'Metscope Ultra', 'Metscope Nexgen']
      },
      {
        label: 'Mono Zoom Microscope',
        href: '/subcategory/mono-zoom-microscope',
        products: ['Monoscope Prime', 'Monoscope Pro']
      },
      {
        label: 'Stereo Zoom Microscope',
        href: '/subcategory/stereo-zoom-microscope',
        products: ['Stereo Prime', 'Stereo Optimet', 'Stereo Promet', 'Stereo Nexgen']
      },
      {
        label: 'Portable Microscope',
        href: '/subcategory/portable-microscope',
        products: ['Portmet', 'Mobiscope']
      },
      {
        label: 'Vision Measuring System',
        href: '/subcategory/vision-measuring-system',
        products: ['VisionEdge Plus', 'VisionEdge Ultra']
      },
      {
        label: 'Microscope Accessories',
        href: '/subcategory/microscope-accessories',
        products: ['Accessories']
      }
    ]
  },
  {
    label: 'Software',
    href: '/category/software',
    subcategories: [],
    products: ['Measurement Prime', 'Aluminium Prime', 'Foundry Prime', 'Copper Prime', 'Hardness Prime', 'Weld Prime', 'Material Prime']
  },
  {
    label: 'Camera',
    href: '/category/camera',
    subcategories: [],
    products: [
      'DIGICAM 5MP (USB 3.0)', 'DIGICAM 5MP (Plug & Play)', 'DIGICAM 4K (USB 3.0 + HDMI)',
      'DIGICAM 5MP (USB 3.0 + HDMI)', 'DIGICAM LCD', 'DIGICAM 10MP (USB 3.0)',
      'DIGICAM 20MP (USB 3.0)', 'DIGICAM Tablet'
    ]
  },
  {
    label: 'Services',
    href: '/category/services',
    subcategories: [],
    products: ['Customized Solution', 'Research & Development', 'Repairing of Equipment & Accessories', '3D Scan, Design & Printing']
  }
]

export const homeProducts = {
  'NDT Products': [
    { name: 'MPT Equipment', href: '/subcategory/mpt-equipment' },
    { name: 'Ultrasonics', href: '/subcategory/ultrasonics' },
    { name: 'Blocks and Tubes', href: '/subcategory/blocks-and-tubes' },
    { name: 'Scanners', href: '/subcategory/scanners' },
    { name: 'Electromagnetic Testing Probes', href: '/subcategory/em-probes' },
  ],
  'Microscope': [
    { name: 'Metallurgical Microscope', href: '/subcategory/metallurgical-microscope' },
    { name: 'Mono Zoom Microscope', href: '/subcategory/mono-zoom-microscope' },
    { name: 'Stereo Zoom Microscope', href: '/subcategory/stereo-zoom-microscope' },
    { name: 'Portable Microscope', href: '/subcategory/portable-microscope' },
    { name: 'Vision Measuring System', href: '/subcategory/vision-measuring-system' },
    { name: 'Microscope Accessories', href: '/subcategory/microscope-accessories' },
  ],
  'Software': [
    { name: 'Measurement Prime', href: '/product/measurement-prime' },
    { name: 'Aluminium Prime', href: '/product/aluminium-prime' },
    { name: 'Foundry Prime', href: '/product/foundry-prime' },
    { name: 'Copper Prime', href: '/product/copper-prime' },
    { name: 'Hardness Prime', href: '/product/hardness-prime' },
    { name: 'Weld Prime', href: '/product/weld-prime' },
    { name: 'Material Prime', href: '/product/material-prime' },
  ],
  'Camera': [
    { name: 'DIGICAM 5MP (Plug & Play)', href: '/product/digicam-5mp-plug-play' },
    { name: 'DIGICAM 5MP (USB 3.0)', href: '/product/digicam-5mp-usb-30' },
    { name: 'DIGICAM 5MP (USB 3.0 + HDMI)', href: '/product/digicam-5mp-usb-30-hdmi' },
    { name: 'DIGICAM 4K (USB 3.0 + HDMI)', href: '/product/digicam-4k-usb-30-hdmi' },
    { name: 'DIGICAM LCD', href: '/product/digicam-lcd' },
    { name: 'DIGICAM 10MP (USB 3.0)', href: '/product/digicam-10mp-usb-30' },
    { name: 'DIGICAM 20MP (USB 3.0)', href: '/product/digicam-20mp-usb-30' },
    { name: 'DIGICAM Tablet', href: '/product/digicam-tablet' },
  ]
}

export const services = [
  { name: 'Repairing of Equipment and Accessories', href: '/product/repairing-of-equipment-accessories', icon: '🔧' },
  { name: 'Customized Solution', href: '/product/customized-solution', icon: '⚙️' },
  { name: 'Research & Development', href: '/product/research-development', icon: '🔬' },
  { name: '3D Designing and Printing', href: '/product/3d-scan-design-printing', icon: '🖨️' }
]

export const heroSlides = [
  {
    title: 'NDT Products',
    subtitle: 'Discover our high-quality, reliable NDT products that ensure the highest level of safety and precision for your industry.',
    link: '/category/ndt-products',
    category: 'NDT'
  },
  {
    title: 'Microscope · Software · Camera',
    subtitle: 'Where cutting-edge technology meets uncompromising accuracy.',
    link: '/category/microscope',
    category: 'PRECISION'
  },
  {
    title: 'Services',
    subtitle: 'Together with Ucomax, shape smarter, innovative solutions designed to deliver enduring success.',
    link: '/category/services',
    category: 'SERVICES'
  }
]
