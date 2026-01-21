import { ListNode } from '../da/LinkedList';

/**
 * 合并两个有序链表
 * @param l1 链表1
 * @param l2 链表2
 * @returns mergeLinkedList
 */
export const mergeTwoLists = (l1?: ListNode, l2?: ListNode): ListNode => {
	const dummy = new ListNode(0);
	let current = dummy;

	while (l1 && l2) {
		if (l1.value <= l2.value) {
			current = l1;
			l1 = l1.next as ListNode;
		} else {
			current = l2;
			l2 = l2.next as ListNode;
		}
		current = current.next as ListNode;
	}

	current.next = (l1 || l2) as ListNode;

	return dummy;
};
