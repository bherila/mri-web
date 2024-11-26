'use client'

const ctaData = [
  {
    linkHref: 'https://www.idealmri.com/why-ideal-mri',
    imageSrc: 'https://uploads-ssl.webflow.com/5b9e87c40899a487ba8091e4/5b9ead31fb9e09c21b36b101_Why.svg',
    altText: '',
    divText: 'Why ideal MRI'
  },
  {
    linkHref: 'https://www.idealmri.com/what-to-expect',
    imageSrc: 'https://uploads-ssl.webflow.com/5b9e87c40899a487ba8091e4/5b9ead2f69d670128b342c0a_Expect.svg',
    altText: '',
    divText: 'What to Expect'
  },
//   {
//     linkHref: 'https://www.idealmri.com/meet-our-team',
//     imageSrc: 'https://uploads-ssl.webflow.com/5b9e87c40899a487ba8091e4/5b9ead2f3661e73d2f76eedd_Meet%20Our%20Team.svg',
//     altText: '',
//     divText: 'Meet Our Team'
//   },
  {
    linkHref: 'https://www.idealmri.com/for-clinicians',
    imageSrc: 'https://uploads-ssl.webflow.com/5b9e87c40899a487ba8091e4/5b9ead313661e7266876eedf_Providers.svg',
    altText: '',
    divText: 'For Clinicians'
  },
  {
    linkHref: 'https://www.idealmri.com/pricing-and-insurance',
    imageSrc: 'https://uploads-ssl.webflow.com/5b9e87c40899a487ba8091e4/5b9ead313661e7547b76eee0_Pricing.svg',
    altText: '',
    divText: 'Pricing & Insurance'
  },
  {
    linkHref: 'https://www.idealmri.com/come-see-us',
    imageSrc: 'https://uploads-ssl.webflow.com/5b9e87c40899a487ba8091e4/5b9ead2f08470e4beefa3f54_Find%20Us.svg',
    altText: '',
    divText: 'Find Us'
  }
]

const linkIds = [
  'w-node-774288a9e25a-774089fe',
  'w-node-774288a9e25e-774089fe',
  'w-node-774288a9e262-774089fe',
  'w-node-774288a9e266-774089fe',
  'w-node-774288a9e26a-774089fe',
  'w-node-774288a9e26e-774089fe'
]

function Footer() {
  return (
    <section className="cta-section">
      <div className="w-container">
        <div className="w-layout-grid grid-2">
          {ctaData.map((item, index) => (
            <a
              key={index}
              href={item.linkHref}
              id={linkIds[index]}
              className="cta-grid-item w-inline-block"
            >
              <img
                src={item.imageSrc}
                alt={item.altText}
                className="cta-button-image"
              />
              <div>{item.divText}</div>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Footer