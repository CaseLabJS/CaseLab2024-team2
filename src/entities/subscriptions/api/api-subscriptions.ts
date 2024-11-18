import { api } from '@/shared/http';

import type { SubscriptionsResponse } from '../model/types/subscriptionsResponse.type';
import type { SubscriptionStatus } from '../model/types/SubscriptionStatus.type';

// ?Проверить подписку
export const getSubscriptionStatusData = async (id: number): Promise<SubscriptionStatus> => {
  const response = await api.get<SubscriptionStatus>(`/subscriptions?id=${id}/`);
  return response.data
}

// Подписаться
export const addSubscriptionToDoc = async (id: number): Promise<number> => {
  const response = await api.post<SubscriptionStatus>(`/subscriptions?id=${id}`);
  return response.status;
}

// Отписаться
export const deleteSubscriptionDoc = async (id: number): Promise<number> => {
  const response = await api.delete(`/subscriptions?id=${id}`);
  return response.status;
};

// Получить все подписки
export const getAllSubscriptionsData = async (): Promise<SubscriptionsResponse> => {
  const response = await api.get<SubscriptionsResponse>(`/subscriptions/all`);
  return response.data
}

// Отписаться от всех подписок
export const deleteAllSubscriptions = async (): Promise<number> => {
  const response = await api.delete(`/subscriptions/all`);
  return response.status;
};
