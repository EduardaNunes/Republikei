
import PostBlock from ".";
import React from 'react';
import { render, screen } from '@testing-library/react-native';

describe('Component: PostBlock', () => {
  it('should render the post title correctly', () => {
    render(
        <PostBlock 
            title="Post Teste" 
            price={300} 
            image={'imagem teste'}
        />
    );

    expect(screen.getByText('Post Teste')).toBeTruthy();
  });
});


