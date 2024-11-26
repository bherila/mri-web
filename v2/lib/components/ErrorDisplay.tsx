import * as React from 'react'
import styled from 'react-emotion'

const Ediv = styled.div`
	padding: 5px;
	border-radius: 5px;
	background-color: #d32f2f;
	color: #fff;
`

const ErrorDisplay: React.SFC<{children}> = ({children}) => (
	<Ediv>{children}</Ediv>
);

export default ErrorDisplay;
