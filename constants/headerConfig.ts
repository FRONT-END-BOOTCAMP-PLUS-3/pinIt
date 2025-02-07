// HEADER_CONFIG 타입 정의
interface PageConfig {
  header: string | null; // 사용할 헤더 컴포넌트 이름
  hasNavigation: boolean; // 네비게이션 사용 여부
}

const HEADER_CONFIG: Array<{ path: RegExp; config: PageConfig }> = [
  // 구체적인 경로는 상단에 위치
  {
    path: /^\/$/,
    config: { header: 'HeaderWithIcon', hasNavigation: true },
  },
  { path: /^\/add$/, config: { header: 'Header', hasNavigation: true } },
  { path: /^\/map$/, config: { header: 'Header', hasNavigation: true } },
  {
    path: /^\/search$/,
    config: { header: 'WhiteHeaderWithBack', hasNavigation: false },
  },
  {
    path: /^\/challenge$/,
    config: { header: 'WhiteHeaderWithBack', hasNavigation: false },
  },
  {
    path: /^\/challenge\/add$/,
    config: { header: 'WhiteHeaderWithBack', hasNavigation: false },
  },
  { path: /^\/like$/, config: { header: 'Header', hasNavigation: true } },
  { path: /^\/profile$/, config: { header: 'Header', hasNavigation: true } },
  {
    path: /^\/profile\/edit$/,
    config: { header: 'WhiteHeaderWithBack', hasNavigation: false },
  },
  {
    path: /^\/profile\/[a-zA-Z0-9_-]+$/,
    config: { header: 'WhiteHeaderWithBack', hasNavigation: false },
  },
  {
    path: /^\/admin$/,
    config: { header: 'Header', hasNavigation: true },
  },
  {
    path: /^\/admin\/topic\/create$/,
    config: { header: 'WhiteHeaderWithBack', hasNavigation: false },
  },
  {
    path: /^\/admin\/topic\/[a-zA-Z0-9_-]+$/,
    config: { header: 'WhiteHeaderWithBack', hasNavigation: false },
  },
  {
    path: /^\/admin\/topic\/[a-zA-Z0-9_-]+\/edit$/,
    config: { header: 'WhiteHeaderWithBack', hasNavigation: false },
  },
  {
    path: /^\/admin\/user\/[a-zA-Z0-9_-]+$/,
    config: { header: 'WhiteHeaderWithBack', hasNavigation: false },
  },

  // 일반적인 [pin-id] 경로는 마지막에 배치
  {
    path: /^\/[a-zA-Z0-9_-]+$/,
    config: { header: 'WhiteHeaderWithBack', hasNavigation: false },
  },
  {
    path: /^\/[a-zA-Z0-9_-]+\/edit$/,
    config: { header: 'WhiteHeaderWithBack', hasNavigation: false },
  },
];

export default HEADER_CONFIG;
