import { LinkedList, ListNode } from "../da/LinkedList";

/**
 * 反转链表
 * @param head 
 * @returns 
 */
export const reverseLinkedList = (head: ListNode | null) => {
  let prev: ListNode | null = null;
  let current = head;

  while(current) {
    const nextNode = current.next; // 保存下一个节点
    current.next = prev; // 反转指针
    prev = current; // prev 向前
    current = nextNode; // current 向前
  }

  return prev;
}