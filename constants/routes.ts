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
    nav: string;
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
    topic: {
      create: string;
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
    nav: '/add',
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
    topic: {
      create: '/admin/topic/create',
      detail: '/admin/topic/[topic-id]',
      edit: '/admin/topic/[topic-id]/edit',
    },
    userDetail: '/admin/user/[user-id]',
  },
};

export default ROUTES;
