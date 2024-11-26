import * as React from 'react'
import Helmet from 'react-helmet'
import {StaticQuery, graphql} from 'gatsby'

// import 'modern-normalize'
// import '../styles/normalize'
import '../styles/webflow.css'
import '../styles/custom.css'
import '../styles/webflow.grid.css'
import '../styles/animate.css'
import '../styles/tables.css'

import Header from '../components/Header'
import LayoutRoot from '../components/LayoutRoot'
import LayoutMain from '../components/LayoutMain'
import Footer from "../components/Footer";
import FooterNav from "../components/FooterNav";

type StaticQueryProps = {
	site: {
		siteMetadata: {
			title: string
			description: string
		}
	}
}

const IndexLayout: React.SFC = ({children}) => (
	<StaticQuery
		query={graphql`
      query IndexLayoutQuery {
        site {
          siteMetadata {
            title
            description
          }
        }
      }
    `}
		render={(data: StaticQueryProps) => (
			<LayoutRoot>
				<Helmet
					title={data.site.siteMetadata.title}
					meta={[
						{name: 'description', content: data.site.siteMetadata.description},
						{name: 'keywords', content: 'gatsbyjs, gatsby, javascript, sample, something'}
					]}
				/>
				<Header/>
				<LayoutMain>{children}</LayoutMain>
				<FooterNav/>
				<Footer/>
			</LayoutRoot>
		)}
	/>
)

export default IndexLayout
