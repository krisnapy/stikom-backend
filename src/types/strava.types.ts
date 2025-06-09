export type Location = {
  lat: number;
  lng: number;
  name: string;
};

export type MapUrls = {
  url: string;
  retinaUrl: string;
  darkRetinaUrl: string;
};

export type RouteMap = {
  id: string;
  polyline: string;
  summaryPolyline: string;
  resourceState: number;
};

export type Athlete = {
  id: number;
  resourceState: number;
  firstName: string;
  lastName: string;
  profileMedium: string;
  profile: string;
}; 