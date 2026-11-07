export type Course = {
  id: string;
  title: string;
  description: string;
  when: string;
  price: string;
  images: string[];
  updatedAt: string;
};

export type CourseInput = {
  title: string;
  description: string;
  when: string;
  price: string;
  images: string[];
};
