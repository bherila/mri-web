import * as React from 'react'
// import styled from 'react-emotion'
// const StyledLayoutMain = styled.main`
//   display: flex;
//   flex-direction: column;
//   flex: 1;
//

interface LayoutMainProps {
  children: React.ReactNode
  className?: string
}

const LayoutMain = ({ children, className }: LayoutMainProps) => (
  <main className={className || "white-section"}>
      <div className="vspace80 w-container">
          {children}
      </div>
  </main>
);

export default LayoutMain
