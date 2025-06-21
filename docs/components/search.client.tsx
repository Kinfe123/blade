'use client';

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import { Button } from '@/components/ui/button';
import { Kbd } from '@/components/ui/kbd';
import { cn } from '@/lib/utils';
import { useEffect, useState } from 'react';

import type { SidebarItem } from '../pages/layout';

interface SearchResult {
  id: string;
  name: string;
  href: string;
}

export function Search({
  items,
  pageContents,
}: {
  items: SidebarItem;
  pageContents: { [href: string]: string };
}) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [searchResults, setSearchResults] = useState<SidebarItem>({});

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, []);

  useEffect(() => {
    if (query.trim() === '') {
      setSearchResults(items);
      return;
    }

    const newSearchResults: SidebarItem = {};
    const lowerCaseQuery = query.toLowerCase();

    for (const key in items) {
      if (Object.prototype.hasOwnProperty.call(items, key)) {
        const groupItems = items[key];
        if (groupItems) {
          const filteredItems = groupItems.filter((item) => {
            const content = pageContents[item.href] || '';
            return (
              item.name.toLowerCase().includes(lowerCaseQuery) ||
              content.toLowerCase().includes(lowerCaseQuery)
            );
          });
          if (filteredItems.length > 0) {
            newSearchResults[key] = filteredItems;
          }
        }
      }
    }
    setSearchResults(newSearchResults);
  }, [query, items, pageContents]);

  return (
    <>
      <Button
        variant="outline"
        className={cn(
          'relative h-9 w-9 p-0 xl:h-10 xl:w-60 xl:justify-start xl:px-3 xl:py-2',
        )}
        onClick={() => setOpen(true)}
      >
        <svg
          className="h-4 w-4 xl:mr-2"
          aria-hidden="true"
          viewBox="0 0 24 24"
        >
          <path
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            stroke="currentColor"
            fill="none"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <span className="hidden xl:inline-flex">Search documentation...</span>
        <Kbd className="absolute right-2 hidden xl:block">⌘K</Kbd>
      </Button>
      <CommandDialog
        open={open}
        onOpenChange={setOpen}
      >
        <CommandInput
          placeholder="Type a command or search..."
          value={query}
          onValueChange={setQuery}
        />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          {Object.entries(searchResults).map(([key, groupItems]) => {
            if (!groupItems || groupItems.length === 0) {
              return null;
            }
            return (
              <CommandGroup
                key={key}
                heading={key}
              >
                {groupItems.map((item) => (
                  <CommandItem
                    key={item.id}
                    value={`${key} ${item.name}`}
                    onSelect={() => {
                      window.location.href = item.href;
                      setOpen(false);
                    }}
                  >
                    {item.name}
                  </CommandItem>
                ))}
              </CommandGroup>
            );
          })}
        </CommandList>
      </CommandDialog>
    </>
  );
} 