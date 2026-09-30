"use client";

import { useState, type KeyboardEvent } from "react";

export type TagInputProps = {
  initialTags?: string[];
  maxTags?: number;
  onChange?: (tags: string[]) => void;
};

export default function TagInput({
  initialTags = [],
  maxTags = 5,
  onChange,
}: TagInputProps) {
  const [tags, setTags] = useState<string[]>(initialTags);
  const [inputValue, setInputvalue] = useState<string>("");

  const isMaxed = tags.length >= maxTags;

  function updateTags(newTags: string[]) {
    setTags(newTags);
    if (onChange) {
      onChange(newTags);
    }
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Backspace") {
      if (inputValue === "" && tags.length > 0) {
        const newTags = tags.slice(0, -1);
        updateTags(newTags);
      }
      return;
    }

    if (e.key !== "Enter") return;
    e.preventDefault();

    if (isMaxed) return;

    const trimmed = inputValue.trim();
    if (trimmed === "" || tags.includes(trimmed)) return;

    const isDuplicate = tags.some(
      (tag) => tag.toLowerCase() === trimmed.toLowerCase(),
    );
    if (isDuplicate) return;

    updateTags([...tags, trimmed]);
    setInputvalue("");
  }

  function removeTag(tagToRemove: string) {
    const newTags = tags.filter((tag) => tag !== tagToRemove);
    updateTags(newTags);
  }

  return (
    <div>
      <div>
        <input
          value={inputValue}
          type="text"
          onChange={(e) => setInputvalue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={isMaxed ? "Max tags reached" : "Add a tag"}
          disabled={isMaxed}
        />
      </div>
      <div>
        <ul>
          {tags.map((tag) => (
            <li key={tag}>
              {tag}
              <button
                type="button"
                aria-label={`Remove ${tag}`}
                onClick={() => {
                  removeTag(tag);
                }}
              >
                x
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
