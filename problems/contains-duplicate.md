---
title: Contains Duplicate
description: Given an integer array nums, return true if any value appears at least twice in the array, and return false if every element is distinct.
published_at: 2024-05-14
---

## Description

Given an integer array `nums`, return `true` if any value appears at least twice in the array, and return `false` if every element is distinct.

## Examples

```ts
containsDuplicate([1, 2, 3, 1]) // true
containsDuplicate([1, 2, 3, 4]) // false
containsDuplicate([1, 1, 1, 3, 3, 4, 3, 2, 4, 2]) // true
```

## Constraints

- `1 <= nums.length <= 10^5`
- `-10^9 <= nums[i] <= 10^9`

## Approach

A [Set](https://mdn.io/Set) is a data structure designed to store unique values. We utilize a set to hold the elements of the array. One advantage of using a Set is its ability to check for the existence of an element in constant time. If the set already contains the element, we return `true`; otherwise, we add the element to the set.

## Solution

```ts
function containsDuplicate(nums: number): boolean {
  const set = new Set<number>()

  for (const num of nums) {
    if (set.has(num)) return true
    set.add(num)
  }

  return false
}
```

## Solution Walkthrough

Suppose we have an array `[3, 1, 4, 1, 5, 9, 2, 6, 5]`.

- **Initialization:** Create an empty Set.

  Set: `{}`

- **Iteration:** Loop through the array.

  - **Element 3:** Add 3 to the Set. Set: `{3}`
  - **Element 1:** Add 1 to the Set. Set: `{1, 3}`
  - **Element 4:** Add 4 to the Set. Set: `{1, 3, 4}`
  - **Element 1:** Since 1 is already in the Set, return `true` and stop the loop.

- **Result:** Since we found a duplicate (1), the function returns `true`.

Let's dry run it with another example, `[2, 3, 1, 4, 5]`.

- **Initialization:** Create an empty Set.

  Set: `{}`

- **Iteration:** Loop through the array.

  - **Element 2:** Add 2 to the Set. Set: `{2}`
  - **Element 3:** Add 3 to the Set. Set: `{2, 3}`
  - **Element 1:** Add 1 to the Set. Set: `{1, 2, 3}`
  - **Element 4:** Add 4 to the Set. Set: `{1, 2, 3, 4}`
  - **Element 5:** Add 5 to the Set. Set: `{1, 2, 3, 4, 5}`

- **Result:** Since there are no duplicates, the function returns `false`.

## Complexity Analysis

- Time complexity: O(n)

  - We traverse the array only once.

- Space complexity: O(n)

  - We use O(n) space for the set.
