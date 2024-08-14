import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { ReviewService } from './review.service';

@Injectable()
export class ReviewShareService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly reviewService: ReviewService,
  ) {}

  async shareReview(userIdx: string, reviewIdx: number): Promise<void> {
    const review = await this.reviewService.getReviewWithIdx(reviewIdx);
    if (!review) {
      throw new NotFoundException('Not Found Review');
    }

    const existingShare = await this.prismaService.reviewShareTb.findFirst({
      where: {
        accountIdx: userIdx,
        reviewIdx: reviewIdx,
      },
    });

    if (existingShare) {
      return;
    }

    await this.prismaService.reviewShareTb.create({
      data: {
        accountIdx: userIdx,
        reviewIdx: reviewIdx,
      },
    });
  }
}
