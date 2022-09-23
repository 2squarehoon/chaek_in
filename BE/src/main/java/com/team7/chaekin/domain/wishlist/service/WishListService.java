package com.team7.chaekin.domain.wishlist.service;

import com.team7.chaekin.domain.book.entity.Book;
import com.team7.chaekin.domain.book.repository.BookRepository;
import com.team7.chaekin.domain.member.entity.Member;
import com.team7.chaekin.domain.member.repository.MemberRepository;
import com.team7.chaekin.domain.wishlist.dto.WishListDto;
import com.team7.chaekin.domain.wishlist.dto.WishListResponse;
import com.team7.chaekin.domain.wishlist.entity.WishList;
import com.team7.chaekin.domain.wishlist.repository.WishListRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
public class WishListService {

    private final WishListRepository wishListRepository;
    private final BookRepository bookRepository;
    private final MemberRepository memberRepository;

    @Transactional
    public WishListResponse getWishList(long memberId) {
        List<WishListDto> dtos = wishListRepository.findByMemberId(memberId).stream()
                .map(wishList -> WishListDto.builder()
                        .wishListId(wishList.getId())
                        .bookId(wishList.getBook().getId())
                        .isbn(wishList.getBook().getIsbn())
                        .title(wishList.getBook().getTitle())
                        .author(wishList.getBook().getAuthor())
                        .cover(wishList.getBook().getCover())
                        .build()).collect(Collectors.toList());
        return new WishListResponse(dtos);
    }

    @Transactional
    public void createWishListBook(long memberId, long bookId) {
        wishListRepository.findByMemberIdAndBookId(memberId, bookId)
                .ifPresentOrElse(
                        wishList -> wishList.gotDibs(),
                        () -> wishListRepository.save(WishList.builder()
                                .member(getMember(memberId))
                                .book(getBook(bookId))
                                .build()));
    }

    @Transactional
    public void deleteWishListBook(long memberId, long bookId) {
        wishListRepository.findByMemberIdAndBookId(memberId, bookId)
                .ifPresent(wishList -> wishList.delete());
    }

    private Book getBook(long bookId) {
        return bookRepository.findById(bookId)
                .orElseThrow(() -> new RuntimeException("해당 도서가 존재하지 않습니다."));
    }

    private Member getMember(long memberId) {
        return memberRepository.findById(memberId)
                .orElseThrow(() -> new RuntimeException("해당 회원이 존재하지 않습니다."));
    }

}
