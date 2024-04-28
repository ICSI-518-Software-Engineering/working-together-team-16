export const toturials = [
    {
      "title": "Container With Most Water",
      "description": "<p><span style=\"color: black;\">Write a Python function to find the maximum area of water that can be contained between vertical lines given by an array of heights.</span></p><br><br><p><b>Examples:</b></p><ul><li>Input: [1,8,6,2,5,4,8,3,7]<br>Output: 49</li><li>Input: [1,1]<br>Output: 1</li></ul>",
      "code": "def max_area(height):\n    max_area = 0\n    left, right = 0, len(height) - 1\n    while left < right:\n        max_area = max(max_area, min(height[left], height[right]) * (right - left))\n        if height[left] < height[right]:\n            left += 1\n        else:\n            right -= 1\n    return max_area",
      "solution": "<p><span style=\"color: black;\">The function maintains two pointers, one at the beginning and one at the end of the array. It calculates the area between the lines at the current positions and updates the maximum area found so far. Then, it moves the pointer with the smaller height towards the center until the pointers meet.</span></p>"
    },
    {
      "title": "Valid Sudoku",
      "description": "<p><span style=\"color: black;\">Write a Python function to determine if a 9x9 Sudoku board is valid. The rules are as follows: each row must contain the digits 1-9 without repetition, each column must contain the digits 1-9 without repetition, and each of the 9 3x3 sub-boxes of the grid must contain the digits 1-9 without repetition.</span></p><br><br><p><b>Examples:</b></p><ul><li>Input: [['5','3','.','.','7','.','.','.','.'],['6','.','.','1','9','5','.','.','.'],['.','9','8','.','.','.','.','6','.'],['8','.','.','.','6','.','.','.','3'],['4','.','.','8','.','3','.','.','1'],['7','.','.','.','2','.','.','.','6'],['.','6','.','.','.','.','2','8','.'],['.','.','.','4','1','9','.','.','5'],['.','.','.','.','8','.','.','7','9']]<br>Output: True</li><li>Input: [['8','3','.','.','7','.','.','.','.'],['6','.','.','1','9','5','.','.','.'],['.','9','8','.','.','.','.','6','.'],['8','.','.','.','6','.','.','.','3'],['4','.','.','8','.','3','.','.','1'],['7','.','.','.','2','.','.','.','6'],['.','6','.','.','.','.','2','8','.'],['.','.','.','4','1','9','.','.','5'],['.','.','.','.','8','.','.','7','9']]<br>Output: False</li></ul>",
      "code": "def is_valid_sudoku(board):\n    rows = [set() for _ in range(9)]\n    cols = [set() for _ in range(9)]\n    boxes = [set() for _ in range(9)]\n    for i in range(9):\n        for j in range(9):\n            if board[i][j] != '.':\n                num = board[i][j]\n                if num in rows[i] or num in cols[j] or num in boxes[(i // 3) * 3 + j // 3]:\n                    return False\n                rows[i].add(num)\n                cols[j].add(num)\n                boxes[(i // 3) * 3 + j // 3].add(num)\n    return True",
      "solution": "<p><span style=\"color: black;\">The function uses sets to keep track of the numbers seen in each row, column, and 3x3 sub-box. It iterates through the board, checking each number against the sets and returning False if a number is found to violate the Sudoku rules.</span></p>"
    },
    {
      "title": "Longest Substring Without Repeating Characters",
      "description": "<p><span style=\"color: black;\">Write a Python function to find the length of the longest substring without repeating characters.</span></p><br><br><p><b>Examples:</b></p><ul><li>Input: 'abcabcbb'<br>Output: 3</li><li>Input: 'bbbbb'<br>Output: 1</li></ul>",
      "code": "def length_of_longest_substring(s):\n    max_length = 0\n    start = 0\n    seen = {}\n    for i, char in enumerate(s):\n        if char in seen and start <= seen[char]:\n            start = seen[char] + 1\n        else:\n            max_length = max(max_length, i - start + 1)\n        seen[char] = i\n    return max_length",
      "solution": "<p><span style=\"color: black;\">The function maintains a sliding window and a dictionary to track the last seen index of each character. It updates the start of the window when a repeating character is encountered and calculates the maximum length of the non-repeating substring.</span></p>"
    },
    {
      "title": "Permutations",
      "description": "<p><span style=\"color: black;\">Write a Python function to return all possible permutations of a collection of distinct integers.</span></p><br><br><p><b>Examples:</b></p><ul><li>Input: [1,2,3]<br>Output: [[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]</li><li>Input: [0,1]<br>Output: [[0,1],[1,0]]</li></ul>",
      "code": "def permutations(nums):\n    def backtrack(path):\n        if len(path) == len(nums):\n            result.append(path)\n            return\n        for num in nums:\n            if num not in path:\n                backtrack(path + [num])\n    result = []\n    backtrack([])\n    return result",
      "solution": "<p><span style=\"color: black;\">The function uses backtracking to generate all possible permutations of the input list. It recursively explores all choices for each position in the permutation, appending valid permutations to the result list.</span></p>"
    },
    {
      "title": "Jump Game",
      "description": "<p><span style=\"color: black;\">Write a Python function to determine if you can reach the last index of an array by jumping from index to index where the value at each index represents the maximum jump length from that position.</span></p><br><br><p><b>Examples:</b></p><ul><li>Input: [2,3,1,1,4]<br>Output: True</li><li>Input: [3,2,1,0,4]<br>Output: False</li></ul>",
      "code": "def can_jump(nums):\n    max_reachable = 0\n    for i, num in enumerate(nums):\n        if i > max_reachable:\n            return False\n        max_reachable = max(max_reachable, i + num)\n        if max_reachable >= len(nums) - 1:\n            return True\n    return False",
      "solution": "<p><span style=\"color: black;\">The function iterates through the array, updating the maximum reachable index as it progresses. If at any point the current index is beyond the maximum reachable index, it returns False. If the maximum reachable index reaches or exceeds the last index of the array, it returns True.</span></p>"
    },
    {
      "title": "Combination Sum II",
      "description": "<p><span style=\"color: black;\">Write a Python function to find all unique combinations in candidates where the candidate numbers sum to the given target. Each number in candidates may only be used once in the combination.</span></p><br><br><p><b>Examples:</b></p><ul><li>Input: candidates = [10,1,2,7,6,1,5], target = 8<br>Output: [[1,1,6],[1,2,5],[1,7],[2,6]]</li><li>Input: candidates = [2,5,2,1,2], target = 5<br>Output: [[1,2,2],[5]]</li></ul>",
      "code": "def combination_sum_2(candidates, target):\n    def backtrack(start, target, path):\n        if target == 0:\n            result.append(path)\n            return\n        if target < 0:\n            return\n        for i in range(start, len(candidates)):\n            if i > start and candidates[i] == candidates[i - 1]:\n                continue\n            backtrack(i + 1, target - candidates[i], path + [candidates[i]])\n    result = []\n    candidates.sort()\n    backtrack(0, target, [])\n    return result",
      "solution": "<p><span style=\"color: black;\">The function is similar to Combination Sum, but it avoids using the same element more than once in a single combination. It skips duplicate elements to ensure uniqueness in the combinations.</span></p>"
    },
    {
      "title": "Next Permutation",
      "description": "<p><span style=\"color: black;\">Write a Python function to generate the next permutation of a given sequence of integers in lexicographic order. If there is no next permutation, return the permutations in ascending order.</span></p><br><br><p><b>Examples:</b></p><ul><li>Input: [1,2,3]<br>Output: [1,3,2]</li><li>Input: [3,2,1]<br>Output: [1,2,3]</li></ul>",
      "code": "def next_permutation(nums):\n    i = len(nums) - 2\n    while i >= 0 and nums[i] >= nums[i + 1]:\n        i -= 1\n    if i >= 0:\n        j = len(nums) - 1\n        while nums[j] <= nums[i]:\n            j -= 1\n        nums[i], nums[j] = nums[j], nums[i]\n    nums[i + 1:] = nums[i + 1:][::-1]\n    return nums",
      "solution": "<p><span style=\"color: black;\">The function finds the first decreasing element from the right and swaps it with the smallest element larger than itself from the right. Then, it reverses the suffix to ensure the next permutation is the smallest possible greater permutation.</span></p>"
    },
    {
      "title": "Spiral Matrix",
      "description": "<p><span style=\"color: black;\">Write a Python function to return all elements of a matrix in spiral order.</span></p><br><br><p><b>Examples:</b></p><ul><li>Input: [[1,2,3],[4,5,6],[7,8,9]]<br>Output: [1,2,3,6,9,8,7,4,5]</li><li>Input: [[1,2,3,4],[5,6,7,8],[9,10,11,12]]<br>Output: [1,2,3,4,8,12,11,10,9,5,6,7]</li></ul>",
      "code": "def spiral_order(matrix):\n    if not matrix:\n        return []\n    result = []\n    top, bottom, left, right = 0, len(matrix) - 1, 0, len(matrix[0]) - 1\n    while top <= bottom and left <= right:\n        for i in range(left, right + 1):\n            result.append(matrix[top][i])\n        top += 1\n        for i in range(top, bottom + 1):\n            result.append(matrix[i][right])\n        right -= 1\n        if top <= bottom:\n            for i in range(right, left - 1, -1):\n                result.append(matrix[bottom][i])\n            bottom -= 1\n        if left <= right:\n            for i in range(bottom, top - 1, -1):\n                result.append(matrix[i][left])\n            left += 1\n    return result",
      "solution": "<p><span style=\"color: black;\">The function iterates through the matrix in a spiral pattern, keeping track of the boundaries of the remaining matrix to traverse. It adds each element encountered to the result list.</span></p>"
    },
    {
      "title": "Palindrome Partitioning",
      "description": "<p><span style=\"color: black;\">Write a Python function to partition a string such that every substring is a palindrome.</span></p><br><br><p><b>Examples:</b></p><ul><li>Input: 'aab'<br>Output: [['a','a','b'],['aa','b']]</li><li>Input: 'a'<br>Output: [['a']]</li></ul>",
      "code": "def partition(s):\n    def is_palindrome(sub):\n        return sub == sub[::-1]\n    def backtrack(start, path):\n        if start == len(s):\n            result.append(path)\n            return\n        for i in range(start, len(s)):\n            if is_palindrome(s[start:i + 1]):\n                backtrack(i + 1, path + [s[start:i + 1]])\n    result = []\n    backtrack(0, [])\n    return result",
      "solution": "<p><span style=\"color: black;\">The function uses backtracking to generate all possible palindrome partitions of the input string. It iterates through the string, considering each possible partition, and recursively explores partitions that are palindromes.</span></p>"
    },
    {
      "title": "Unique Paths",
      "description": "<p><span style=\"color: black;\">Write a Python function to count all possible unique paths from the top-left corner to the bottom-right corner of a m x n grid. You can only move either down or right at any point in time.</span></p><br><br><p><b>Examples:</b></p><ul><li>Input: m = 3, n = 7<br>Output: 28</li><li>Input: m = 3, n = 2<br>Output: 3</li></ul>",
      "code": "def unique_paths(m, n):\n    dp = [[1] * n for _ in range(m)]\n    for i in range(1, m):\n        for j in range(1, n):\n            dp[i][j] = dp[i - 1][j] + dp[i][j - 1]\n    return dp[-1][-1]",
      "solution": "<p><span style=\"color: black;\">The function uses dynamic programming to build a table of unique paths. It iterates through the grid, updating each cell with the number of unique paths to reach that cell from the top-left corner.</span></p>"
    },
    {
      "title": "Jump Game II",
      "description": "<p><span style=\"color: black;\">Write a Python function to find the minimum number of jumps required to reach the last index of an array by jumping from index to index where the value at each index represents the maximum jump length from that position.</span></p><br><br><p><b>Examples:</b></p><ul><li>Input: [2,3,1,1,4]<br>Output: 2</li><li>Input: [2,3,0,1,4]<br>Output: 2</li></ul>",
      "code": "def jump(nums):\n    if len(nums) == 1:\n        return 0\n    jumps = 0\n    curr_end = 0\n    max_reachable = 0\n    for i in range(len(nums) - 1):\n        max_reachable = max(max_reachable, i + nums[i])\n        if i == curr_end:\n            jumps += 1\n            curr_end = max_reachable\n            if curr_end >= len(nums) - 1:\n                break\n    return jumps",
      "solution": "<p><span style=\"color: black;\">The function simulates the jumps through the array, updating the maximum reachable index and tracking the end of the current jump. It counts the number of jumps needed to reach the end of the array.</span></p>"
    },
    {
        "title": "Palindrome Number",
        "description": "<p><span style=\"color: black;\">Write a Python function to determine whether an integer is a palindrome. An integer is a palindrome when it reads the same backward as forward.</span></p><br><br><p><b>Examples:</b></p><ul><li>Input: 121<br>Output: True</li><li>Input: -121<br>Output: False</li></ul>",
        "code": "def is_palindrome(x):\n    if x < 0:\n        return False\n    return str(x) == str(x)[::-1]",
        "solution": "<p><span style=\"color: black;\">The function converts the integer to a string and checks if the string is equal to its reverse. It handles negative integers by returning False immediately.</span></p>"
      },
      {
        "title": "Merge Intervals",
        "description": "<p><span style=\"color: black;\">Write a Python function to merge overlapping intervals given a collection of intervals. Each interval is represented as a pair of start and end points.</span></p><br><br><p><b>Examples:</b></p><ul><li>Input: [[1,3],[2,6],[8,10],[15,18]]<br>Output: [[1,6],[8,10],[15,18]]</li><li>Input: [[1,4],[4,5]]<br>Output: [[1,5]]</li></ul>",
        "code": "def merge(intervals):\n    if not intervals:\n        return []\n    intervals.sort(key=lambda x: x[0])\n    merged = [intervals[0]]\n    for interval in intervals[1:]:\n        if interval[0] <= merged[-1][1]:\n            merged[-1][1] = max(merged[-1][1], interval[1])\n        else:\n            merged.append(interval)\n    return merged",
        "solution": "<p><span style=\"color: black;\">The function sorts the intervals by their start points and then iterates through the sorted intervals, merging overlapping intervals as it goes.</span></p>"
      },
      {
        "title": "Subsets",
        "description": "<p><span style=\"color: black;\">Write a Python function to return all possible subsets of a set of distinct integers.</span></p><br><br><p><b>Examples:</b></p><ul><li>Input: [1,2,3]<br>Output: [[],[1],[2],[1,2],[3],[1,3],[2,3],[1,2,3]]</li><li>Input: [0]<br>Output: [[],[0]]</li></ul>",
        "code": "def subsets(nums):\n    result = [[]]\n    for num in nums:\n        result += [curr + [num] for curr in result]\n    return result",
        "solution": "<p><span style=\"color: black;\">The function iterates through the input list, adding each element to all existing subsets to generate new subsets.</span></p>"
      },
      {
        "title": "Reverse Linked List",
        "description": "<p><span style=\"color: black;\">Write a Python function to reverse a singly linked list.</span></p><br><br><p><b>Examples:</b></p><ul><li>Input: 1->2->3->4->5->NULL<br>Output: 5->4->3->2->1->NULL</li><li>Input: 1->NULL<br>Output: 1->NULL</li></ul>",
        "code": "class ListNode:\n    def __init__(self, val=0, next=None):\n        self.val = val\n        self.next = next\n\ndef reverse_linked_list(head):\n    prev = None\n    while head:\n        next_node = head.next\n        head.next = prev\n        prev = head\n        head = next_node\n    return prev",
        "solution": "<p><span style=\"color: black;\">The function iterates through the linked list, reversing the direction of the pointers as it goes.</span></p>"
      },
      {
        "title": "Search in Rotated Sorted Array",
        "description": "<p><span style=\"color: black;\">Write a Python function to search for a target value in a rotated sorted array of integers.</span></p><br><br><p><b>Examples:</b></p><ul><li>Input: nums = [4,5,6,7,0,1,2], target = 0<br>Output: 4</li><li>Input: nums = [4,5,6,7,0,1,2], target = 3<br>Output: -1</li></ul>",
        "code": "def search(nums, target):\n    left, right = 0, len(nums) - 1\n    while left <= right:\n        mid = (left + right) // 2\n        if nums[mid] == target:\n            return mid\n        if nums[left] <= nums[mid]:\n            if nums[left] <= target <= nums[mid]:\n                right = mid - 1\n            else:\n                left = mid + 1\n        else:\n            if nums[mid] <= target <= nums[right]:\n                left = mid + 1\n            else:\n                right = mid - 1\n    return -1",
        "solution": "<p><span style=\"color: black;\">The function performs a binary search, adjusting the search range based on whether the left or right half is sorted.</span></p>"
      },
      {
        "title": "Generate Parentheses",
        "description": "<p><span style=\"color: black;\">Write a Python function to generate all combinations of well-formed parentheses given the number of pairs of parentheses.</span></p><br><br><p><b>Examples:</b></p><ul><li>Input: 3<br>Output: ['((()))', '(()())', '(())()', '()(())', '()()()']</li><li>Input: 1<br>Output: ['()']</li></ul>",
        "code": "def generate_parentheses(n):\n    def backtrack(s, left, right):\n        if len(s) == 2 * n:\n            result.append(s)\n            return\n        if left < n:\n            backtrack(s + '(', left + 1, right)\n        if right < left:\n            backtrack(s + ')', left, right + 1)\n    result = []\n    backtrack('', 0, 0)\n    return result",
        "solution": "<p><span style=\"color: black;\">The function uses backtracking to generate all possible combinations of parentheses while ensuring they are well-formed.</span></p>"
      },
      {
        "title": "Maximum Subarray",
        "description": "<p><span style=\"color: black;\">Write a Python function to find the contiguous subarray (containing at least one number) which has the largest sum and return its sum.</span></p><br><br><p><b>Examples:</b></p><ul><li>Input: [-2,1,-3,4,-1,2,1,-5,4]<br>Output: 6</li><li>Input: [1]<br>Output: 1</li></ul>",
        "code": "def max_subarray(nums):\n    max_sum = float('-inf')\n    current_sum = 0\n    for num in nums:\n        current_sum = max(num, current_sum + num)\n        max_sum = max(max_sum, current_sum)\n    return max_sum",
        "solution": "<p><span style=\"color: black;\">The function iterates through the array, keeping track of the maximum sum of subarrays encountered so far and updating it as needed.</span></p>"
      },
      {
        "title": "Pow(x, n)",
        "description": "<p><span style=\"color: black;\">Write a Python function to calculate the value of x raised to the power n (x<sup>n</sup>).</span></p><br><br><p><b>Examples:</b></p><ul><li>Input: x = 2.00000, n = 10<br>Output: 1024.00000</li><li>Input: x = 2.10000, n = 3<br>Output: 9.26100</li></ul>",
        "code": "def my_pow(x, n):\n    if n == 0:\n        return 1\n    if n < 0:\n        return 1 / my_pow(x, -n)\n    if n % 2 == 0:\n        return my_pow(x * x, n // 2)\n    else:\n        return x * my_pow(x, n - 1)",
        "solution": "<p><span style=\"color: black;\">The function uses recursion and divides the problem into smaller subproblems, reducing the time complexity by half at each step.</span></p>"
      },
      {
        "title": "Minimum Path Sum",
        "description": "<p><span style=\"color: black;\">Write a Python function to find the minimum path sum from the top-left corner to the bottom-right corner of a grid by moving down or right.</span></p><br><br><p><b>Examples:</b></p><ul><li>Input: [[1,3,1],[1,5,1],[4,2,1]]<br>Output: 7</li><li>Input: [[1,2,3],[4,5,6]]<br>Output: 12</li></ul>",
        "code": "def min_path_sum(grid):\n    m, n = len(grid), len(grid[0])\n    dp = [[0] * n for _ in range(m)]\n    dp[0][0] = grid[0][0]\n    for i in range(1, m):\n        dp[i][0] = dp[i - 1][0] + grid[i][0]\n    for j in range(1, n):\n        dp[0][j] = dp[0][j - 1] + grid[0][j]\n    for i in range(1, m):\n        for j in range(1, n):\n            dp[i][j] = min(dp[i - 1][j], dp[i][j - 1]) + grid[i][j]\n    return dp[-1][-1]",
        "solution": "<p><span style=\"color: black;\">The function uses dynamic programming to build a table of minimum path sums. It iterates through the grid, calculating the minimum path sum to reach each cell from the top-left corner.</span></p>"
      },
      {
        "title": "Group Anagrams",
        "description": "<p><span style=\"color: black;\">Write a Python function to group anagrams together from a list of strings.</span></p><br><br><p><b>Examples:</b></p><ul><li>Input: ['eat', 'tea', 'tan', 'ate', 'nat', 'bat']<br>Output: [['eat','tea','ate'],['tan','nat'],['bat']]</li><li>Input: ['']<br>Output: [['']]</li></ul>",
        "code": "def group_anagrams(strs):\n    groups = {}\n    for s in strs:\n        key = tuple(sorted(s))\n        groups[key] = groups.get(key, []) + [s]\n    return list(groups.values())",
        "solution": "<p><span style=\"color: black;\">The function uses a dictionary to group anagrams by their sorted representations, storing the anagrams in lists.</span></p>"
      },
      {
        "title": "Counting Bits",
        "description": "<p><span style=\"color: black;\">Write a Python function to return the number of 1's in the binary representation of every number from 0 to n, inclusive.</span></p><br><br><p><b>Examples:</b></p><ul><li>Input: 2<br>Output: [0,1,1]</li><li>Input: 5<br>Output: [0,1,1,2,1,2]</li></ul>",
        "code": "def count_bits(n):\n    bits = [0] * (n + 1)\n    for i in range(1, n + 1):\n        bits[i] = bits[i // 2] + (i % 2)\n    return bits",
        "solution": "<p><span style=\"color: black;\">The function uses dynamic programming to calculate the number of 1's in each number's binary representation based on its previous bits.</span></p>"
      },
      {
        "title": "Letter Combinations of a Phone Number",
        "description": "<p><span style=\"color: black;\">Write a Python function to return all possible letter combinations that the given phone number could represent.</span></p><br><br><p><b>Examples:</b></p><ul><li>Input: '23'<br>Output: ['ad', 'ae', 'af', 'bd', 'be', 'bf', 'cd', 'ce', 'cf']</li><li>Input: ''<br>Output: []</li></ul>",
        "code": "def letter_combinations(digits):\n    if not digits:\n        return []\n    mapping = {\n        '2': 'abc',\n        '3': 'def',\n        '4': 'ghi',\n        '5': 'jkl',\n        '6': 'mno',\n        '7': 'pqrs',\n        '8': 'tuv',\n        '9': 'wxyz'\n    }\n    result = ['']\n    for digit in digits:\n        result = [prefix + letter for prefix in result for letter in mapping[digit]]\n    return result",
        "solution": "<p><span style=\"color: black;\">The function uses backtracking to generate all possible combinations of letters corresponding to the digits in the phone number.</span></p>"
      }
  ]
  
  
  
  