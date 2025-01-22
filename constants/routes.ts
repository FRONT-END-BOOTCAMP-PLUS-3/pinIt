interface RouteConfig {
  home: string;
  pin: {
    detail: string;
    edit: string;
  };
  search: string;
  challenge: {
    list: string;
    add: string;
  };
  map: string;
  add: {
    pin: string;
    location: string;
  };
  like: string;
  profile: {
    nav: string;
    detail: string;
    edit: string;
  };
  admin: {
    nav: string;
    createChallengeTopic: string;
    challengeTopic: {
      detail: string;
      edit: string;
    };
    userDetail: string;
  };
}

const ROUTES: RouteConfig = {
  home: '/',
  pin: {
    detail: '/[pin-id]',
    edit: '/[pin-id]/edit',
  },
  search: '/search',
  challenge: {
    list: '/challenge',
    add: '/challenge/add',
  },
  map: '/map',
  add: {
    pin: '/add',
    location: '/add/location',
  },
  like: '/like',
  profile: {
    nav: '/profile',
    detail: '/profile/[user-id]',
    edit: '/profile/edit',
  },
  admin: {
    nav: '/admin',
    createChallengeTopic: '/admin/createChallengeTopic',
    challengeTopic: {
      detail: '/admin/[topic-id]',
      edit: '/admin/[topic-id]/edit',
    },
    userDetail: '/admin/[user-id]',
  },
};

export default ROUTES;
