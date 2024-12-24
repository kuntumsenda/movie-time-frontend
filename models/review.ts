export type ModelReview = {
  author: string;
  author_details: ModelReviewAuthorDetail;
  content: string;
  created_at: string;
  id: string;
  updated_at: string;
  url: string;
};

export type ModelReviewAuthorDetail = {
  name: string;
  username: string;
  avatar_path: string;
  rating: string;
};
