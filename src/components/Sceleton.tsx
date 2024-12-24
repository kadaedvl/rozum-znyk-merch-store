import React from "react"
import ContentLoader from "react-content-loader"

const Sceleton: React.FC = (props) => (
  <ContentLoader
    speed={2}
    width={300}
    height={389}
    viewBox="0 0 300 389"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}
  >
    <rect x="0" y="0" rx="5" ry="5" width="300" height="200" />
    <rect x="10" y="211" rx="0" ry="0" width="259" height="25" />
    <rect x="10" y="240" rx="0" ry="0" width="186" height="15" />
    <rect x="10" y="265" rx="0" ry="0" width="223" height="15" />
    <rect x="10" y="290" rx="0" ry="0" width="125" height="22" />
    <rect x="10" y="320" rx="0" ry="0" width="125" height="11" />
    <rect x="10" y="340" rx="0" ry="0" width="125" height="11" />
    <rect x="10" y="355" rx="5" ry="5" width="259" height="25" />
  </ContentLoader>
)

export default Sceleton