import * as React from 'react';
import {Pagination} from '@shopify/hydrogen';

/**
 * <PaginatedResourceSection > is a component that encapsulate how the previous and next behaviors throughout your application.
 */
export function PaginatedResourceSection<NodesType>({
  connection,
  children,
  resourcesClassName,
}: {
  connection: React.ComponentProps<typeof Pagination<NodesType>>['connection'];
  children: React.FunctionComponent<{node: NodesType; index: number}>;
  resourcesClassName?: string;
}) {
  return (
    <Pagination connection={connection}>
      {({nodes, isLoading, PreviousLink, NextLink}) => {
        const resourcesMarkup = nodes.map((node, index) =>
          children({node, index}),
        );

        return (
          <div>
            <div className="flex justify-center">
              <PreviousLink>
                {isLoading ? (
                  <span className="px-6 py-3 rounded-md bg-gray-200 text-gray-700 cursor-not-allowed">Loading...</span>
                ) : (
                  <span className="px-6 py-3 rounded-md bg-[#FBAC18] text-black font-medium hover:opacity-90 transition">↑ Load previous</span>
                )}
              </PreviousLink>
            </div>
            {resourcesClassName ? (
              <div className={resourcesClassName}>{resourcesMarkup}</div>
            ) : (
              resourcesMarkup
            )}
            <div className="flex justify-center my-8">
              <NextLink>
                {isLoading ? (
                  <span className="px-8 py-3 rounded-md bg-gray-200 text-gray-700 cursor-not-allowed">Loading...</span>
                ) : (
                  <span className="px-8 py-3 rounded-md bg-[#FBAC18] text-black font-medium hover:opacity-90 transition">Load more ↓</span>
                )}
              </NextLink>
            </div>
          </div>
        );
      }}
    </Pagination>
  );
}
