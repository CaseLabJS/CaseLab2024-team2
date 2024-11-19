import { api } from '@/shared/http';

import type { SubscriptionsResponse } from '../model/types/subscriptionsResponse.type';
import type { SubscriptionStatus } from '../model/types/subscriptionStatus.type';

// Проверить подписку
export const checkSubscriptionStatus = async (id: number): Promise<SubscriptionStatus> => {
  const response = await api.get<SubscriptionStatus>(`/subscriptions?documentId=${id}`);
  return response.data
}

// Подписаться
export const addSubscriptionToDoc = async (id: number): Promise<boolean> => {
  const response = await api.post(`/subscriptions?documentId=${id}`);
  return response.status === 200;
}

// Отписаться
export const deleteSubscriptionDoc = async (id: number): Promise<boolean> => {
  const response = await api.delete(`/subscriptions?documentId=${id}`);
  return response.status === 200;
};

// Получить все подписки
export const getAllSubscriptionsData = async (): Promise<SubscriptionsResponse[]> => {
  const response = await api.get<SubscriptionsResponse[]>(`/subscriptions/all`);
  return response.data
}

// Отписаться от всех подписок
export const deleteAllSubscriptions = async (): Promise<boolean> => {
  const response = await api.delete(`/subscriptions/all`);
  return response.status === 200;
};
