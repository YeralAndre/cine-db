export interface Movie {
  id?: string;
  poster?: string;
  top?: string;
  title?: string;
  year?: string;
  rating?: string;
  genres?: string[];
  overview?: string;
  adult?: boolean;
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
  poster?: string;
  tags?: string[];
  synopsis?: string;
  trailer?: string;
  direction?: string;
  writers?: string[];
  actors?: string[];
}