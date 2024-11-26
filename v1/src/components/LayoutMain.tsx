import * as React from 'react'
// import styled from 'react-emotion'
// const StyledLayoutMain = styled.main`
//   display: flex;
//   flex-direction: column;
//   flex: 1;
//

interface LayoutMainProps {
  className?: string
}

// <StyledLayoutMain className={className}>{children}</StyledLayoutMain>
const LayoutMain: React.SFC<LayoutMainProps> = ({ children, className }) => (
  <main className={className || "white-section"}>
      <div className="vspace80 w-container">
          {children}
      </div>
  </main>
);

export default LayoutMain
