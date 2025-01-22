// 경로별로 사용하는 헤더와 네비게이션 여부를 관리하기 위한 파일
import ROUTES from './routes';

interface PageConfig {
  header: string; // 사용할 헤더 컴포넌트 이름
  hasNavigation: boolean; // 네비게이션 사용 여부
}

const HEADER_CONFIG: Record<string, PageConfig> = {
  [ROUTES.home]: { header: 'HeaderWithIcon', hasNavigation: true },
  [ROUTES.pin.detail]: { header: 'WhiteHeaderWithBack', hasNavigation: false },
  [ROUTES.pin.edit]: { header: 'WhiteHeaderWithBack', hasNavigation: false },
  [ROUTES.search]: { header: 'WhiteHeaderWithBack', hasNavigation: false },
  [ROUTES.challenge.list]: {
    header: 'WhiteHeaderWithBack',
    hasNavigation: false,
  },
  [ROUTES.challenge.add]: {
    header: 'WhiteHeaderWithBack',
    hasNavigation: false,
  },
  [ROUTES.map]: { header: 'Header', hasNavigation: true },
  [ROUTES.add.pin]: { header: 'Header', hasNavigation: true },
  [ROUTES.add.location]: {
    header: 'WhiteHeaderWithBack',
    hasNavigation: false,
  },
  [ROUTES.like]: { header: 'Header', hasNavigation: true },
  [ROUTES.profile.nav]: { header: 'Header', hasNavigation: true },
  [ROUTES.profile.detail]: {
    header: 'WhiteHeaderWithBack',
    hasNavigation: false,
  },
  [ROUTES.profile.edit]: {
    header: 'WhiteHeaderWithBack',
    hasNavigation: false,
  },
  [ROUTES.admin.nav]: { header: 'HeaderWithIcon', hasNavigation: true },
  [ROUTES.admin.createChallengeTopic]: {
    header: 'WhiteHeaderWithBack',
    hasNavigation: false,
  },
  [ROUTES.admin.challengeTopic.detail]: {
    header: 'WhiteHeaderWithBack',
    hasNavigation: false,
  },
  [ROUTES.admin.challengeTopic.edit]: {
    header: 'WhiteHeaderWithBack',
    hasNavigation: false,
  },
  [ROUTES.admin.userDetail]: {
    header: 'WhiteHeaderWithBack',
    hasNavigation: false,
  },
};

export default HEADER_CONFIG;
