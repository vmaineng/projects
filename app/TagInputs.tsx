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

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key !== "Enter" || isMaxed) return;

    if (inputValue.trim() === "") return;

    if (tags.includes(inputValue.trim())) {
      setInputvalue("");
      return;
    }

    const newTags = [...tags, inputValue.trim()];
    setTags(newTags);
    setInputvalue("");
  }

  return (
    <div>
      <div>
        <input
          value={inputValue}
          type="text"
          onChange={(e) => setInputvalue(e.target.value)}
          placeholder={isMaxed ? "Max tags reached" : "Add a tag"}
          disabled={isMaxed}
        />
      </div>
      <div>
        <ul>
          {tags.map((tag) => (
            <li key={tag}>
              {tag}
              <button type="button" aria-label={`Remove ${tag}`}>
                x
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
