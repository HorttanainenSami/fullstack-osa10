import React from 'react';
import { RepositoryListContainer } from '../tabs/RepositoryList';
import { render } from '@testing-library/react-native';

describe('RepositoryList', () => {
  describe('RepositoryListContainer', () => {
    it('renders repository information correctly', () => {
      const repositories = {
        totalCount: 8,
        pageInfo: {
          hasNextPage: true,
          endCursor:
            'WyJhc3luYy1saWJyYXJ5LnJlYWN0LWFzeW5jIiwxNTg4NjU2NzUwMDc2XQ==',
          startCursor: 'WyJqYXJlZHBhbG1lci5mb3JtaWsiLDE1ODg2NjAzNTAwNzZd',
        },
        edges: [
          {
            node: {
              id: 'jaredpalmer.formik',
              fullName: 'jaredpalmer/formik',
              description: 'Build forms in React, without the tears',
              language: 'TypeScript',
              forksCount: 1619,
              stargazersCount: 21856,
              ratingAverage: 88,
              reviewCount: 3,
              ownerAvatarUrl:
                'https://avatars2.githubusercontent.com/u/4060187?v=4',
            },
            cursor: 'WyJqYXJlZHBhbG1lci5mb3JtaWsiLDE1ODg2NjAzNTAwNzZd',
          },
          {
            node: {
              id: 'async-library.react-async',
              fullName: 'async-library/react-async',
              description: 'Flexible promise-based React data loader',
              language: 'JavaScript',
              forksCount: 69,
              stargazersCount: 1760,
              ratingAverage: 72,
              reviewCount: 3,
              ownerAvatarUrl:
                'https://avatars1.githubusercontent.com/u/54310907?v=4',
            },
            cursor:
              'WyJhc3luYy1saWJyYXJ5LnJlYWN0LWFzeW5jIiwxNTg4NjU2NzUwMDc2XQ==',
          },
        ],
      };

      // Add your test code here
      const { getAllByTestId } = render(<RepositoryListContainer repositories={repositories} testId='test' />);
      const listOfNodes = getAllByTestId('item');
      expect(listOfNodes[0]).toHaveTextContent('jaredpalmer/formik');
      expect(listOfNodes[0]).toHaveTextContent('Build forms in React, without the tears');
      expect(listOfNodes[0]).toHaveTextContent('TypeScript');
      expect(listOfNodes[0]).toHaveTextContent('1.6k');
      expect(listOfNodes[0]).toHaveTextContent('21.9k');
      expect(listOfNodes[0]).toHaveTextContent('88');
      expect(listOfNodes[0]).toHaveTextContent('3');

      expect(listOfNodes[1]).toHaveTextContent('async-library/react-async');
      expect(listOfNodes[1]).toHaveTextContent('Flexible promise-based React data loader');
      expect(listOfNodes[1]).toHaveTextContent('JavaScript');
      expect(listOfNodes[1]).toHaveTextContent('69');
      expect(listOfNodes[1]).toHaveTextContent('1.8k');
      expect(listOfNodes[1]).toHaveTextContent('72');
      expect(listOfNodes[1]).toHaveTextContent('3');
    });
  });
});
