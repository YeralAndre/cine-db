export interface TopMovie {
  id?: string;
  poster?: string;
  top?: string;
  status?: {
    info: "up" | "down";
    number: string;
  };
  title?: string;
  year?: string;
  duration?: string;
  category?: string;
  rating?: string;
}

export interface QueryMovie {
  id?: string;
  poster?: string;
  title?: string;
  year?: string;
  type?: string;
  authors?: string[];
}

export interface InfoMovie {
  id?: string;
  title?: string;
  originalTitle?: string;
  year?: string;
  category?: string;
  duration?: string;
  rating?: string;
  peopleRating?: string;
  popularity?: {
    top?: string;
    status?: {
      info: "up" | "down";
      number: string;
    };
  };
  poster?: string;
  tags?: string[];
  synopsis?: string;
  trailer?: string;
  direction?: string;
  writers?: string[];
  actors?: string[];
}