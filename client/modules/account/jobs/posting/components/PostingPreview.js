// @flow
import React from 'react';
import styled, { keyframes } from 'styled-components';
import PostingBody from '../containers/PostingBody';
import PostingMap from '../containers/PostingMap';
import PostingPreviewPlaceholder from './PostingPreviewPlaceholder';
import FadeIn from '../../../../../styles/components/FadeIn';

const PostingPreview = (props: { activePosting: {} }) => {
  const { activePosting } = props;
  const activePostingReady: boolean = Object.keys(activePosting).length > 0;

  return (
    <PostingPreviewContainer>
      {activePostingReady
        ? <FadeIn>
            <PostingPreviewContent>
              <PostingBody activePosting={activePosting} />
            </PostingPreviewContent>
            <PostingMap activePosting={activePosting} />
          </FadeIn>
        : <PostingPreviewPlaceholder />}
    </PostingPreviewContainer>
  );
};

export default PostingPreview;

const PostingPreviewContainer = styled.div`
  display: flex;
  justify-content: center;
  margin: 0 auto;
`;

const PostingPreviewContent = styled.div`
  display: flex;
  justify-content: center;
`;
