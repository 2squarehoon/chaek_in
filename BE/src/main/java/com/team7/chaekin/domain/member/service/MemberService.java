package com.team7.chaekin.domain.member.service;

import com.team7.chaekin.domain.book.entity.Book;
import com.team7.chaekin.domain.booklog.entity.BookLog;
import com.team7.chaekin.domain.booklog.entity.ReadStatus;
import com.team7.chaekin.domain.booklog.repository.BooklogRepository;
import com.team7.chaekin.domain.member.dto.MemberBookListDto;
import com.team7.chaekin.domain.member.dto.MemberBooksResponse;
import com.team7.chaekin.domain.member.dto.MemberCreateRequest;
import com.team7.chaekin.domain.member.dto.MemberUpdateRequest;
import com.team7.chaekin.domain.member.entity.Member;
import com.team7.chaekin.domain.member.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;

@Slf4j
@RequiredArgsConstructor
@Service
public class MemberService {

    private final MemberRepository memberRepository;
    private final BooklogRepository booklogRepository;

    @Transactional
    public MemberBooksResponse getMemberBooks(long memberId) {
        Member member = getMember(memberId);
        //TODO: booklogRepository에서 member를 가지고 있는 Booklog들 리스트 뽑기.
        List<BookLog> booklogList = new ArrayList();

        List<MemberBookListDto> readingBooks = new ArrayList<>();
        List<MemberBookListDto> completeBooks = new ArrayList<>();

        for (BookLog bookLog : booklogList) {
            List<MemberBookListDto> saveList = bookLog.getReadStatus().equals(ReadStatus.READING) ?
                    readingBooks : completeBooks;

            Book book = bookLog.getBook();
            saveList.add(MemberBookListDto.builder()
                    .bookId(book.getId())
                    .isbn(book.getIsbn())
                    .title(book.getTitle())
                    .author(book.getAuthor())
                    .cover(book.getCover())
                    .build());
        }

        return new MemberBooksResponse(readingBooks, completeBooks);
    }

    @Transactional
    public void saveAdditionalInformation(MemberCreateRequest memberCreateRequest) {
        memberRepository.save(memberCreateRequest.toEntity());
    }

    @Transactional
    public void updateAdditionalInformation(long memberId, MemberUpdateRequest memberUpdateRequest) {
        Member findMember = getMember(memberId);
        findMember.updateInformation(memberUpdateRequest);
    }

    @Transactional
    public void deleteMember(long memberId) {
        Member member = getMember(memberId);
        member.deleteMember();
    }

    private Member getMember(long memberId) {
        Member findMember = memberRepository.findById(memberId)
                .orElseThrow(() -> new RuntimeException());
        if (findMember.isRemoved()) {
            log.info("Deleted Member : memberId = {}", memberId);
            throw new RuntimeException("해당 회원이 존재하지 않습니다.");
        }

        return findMember;
    }

}
