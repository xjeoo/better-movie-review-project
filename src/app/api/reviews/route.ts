import { decrypt } from "@/lib/auth/jwt";
import { deleteReviewById, editReviewById, updateRatingOnDelete, updateRatingOnUpdate } from "@/lib/movies/reviews";
import { userOwnsReview } from "@/lib/user/user";
import { userInfo } from "@/types/entites";
import { NextRequest, NextResponse } from "next/server";


export async function DELETE(request : NextRequest){
  const authorizationHeader = request.headers.get('Authorization');
  if(!authorizationHeader) return NextResponse.json({error:'Token missing'},{status:401});
  const token = authorizationHeader.split(' ')[1];
  
  const {reviewId, movieId, rating} = await request.json();
  if(!reviewId) return NextResponse.json({error:'Review id missing'},{status:400});
  if(!movieId) return NextResponse.json({error:'Movie id missing'},{status:400});
  if(!rating) return NextResponse.json({error:'Rating missing'},{status:400});


  const userInfo = await decrypt(token);
  if(!userInfo)return NextResponse.json({error:'Token decryption failed'},{status:500});

  const reviewOwned = await userOwnsReview((userInfo.data as userInfo).userId, reviewId );
  if(!reviewOwned.ok) return NextResponse.json({error: reviewOwned.message},{status:403});

  const ratingUpdated = await updateRatingOnDelete(movieId, parseInt(rating));
  if(!ratingUpdated)return NextResponse.json({error: 'Failed to update rating'},{status:500});

  const reviewDeleted = await deleteReviewById(reviewId);
  if(!reviewDeleted)return NextResponse.json({error: 'Failed to delete review'},{status:500});

 
  return NextResponse.json({message: 'Review deleted successfuly'},{status:200})

}

export async function PATCH(request: NextRequest){
  const authorizationHeader = request.headers.get('Authorization');
  if(!authorizationHeader) return NextResponse.json({error:'Token missing'},{status:401});
  const token = authorizationHeader.split(' ')[1];
  
  const {reviewId, movieId, oldRating, oldText, newRating, newText} = await request.json();
  if(!reviewId) return NextResponse.json({error:'Review id missing'},{status:401});
  if(!movieId) return NextResponse.json({error:'Movie id missing'},{status:401});
  if(!oldRating) return NextResponse.json({error:'Previous rating missing'},{status:401});
  if(!oldText) return NextResponse.json({error:'Previous text missing'},{status:401});
  if(!newRating) return NextResponse.json({error:'New rating missing'},{status:401});
  if(!newText) return NextResponse.json({error:'New text missing'},{status:401});

  if(oldRating === newRating && oldText === newText) return NextResponse.json({message:'Nothing modified'},{status:200});

  const userInfo = await decrypt(token);
  if(!userInfo)return NextResponse.json({error:'Token decryption failed'},{status:500});

  const reviewOwned = await userOwnsReview((userInfo.data as userInfo).userId, reviewId );
  if(!reviewOwned.ok) return NextResponse.json({error: reviewOwned.message},{status:403});

  const ratingUpdated = await updateRatingOnUpdate(movieId, parseInt(oldRating), parseInt(newRating));
  if(!ratingUpdated)return NextResponse.json({error: 'Failed to update rating'},{status:500});

  const reviewUpdated = await editReviewById(reviewId, parseInt(newRating), newText);
  if(!ratingUpdated)return NextResponse.json({error: 'Failed to update review'},{status:500});

  return NextResponse.json({message: 'Review edited successfuly'},{status:200})
}