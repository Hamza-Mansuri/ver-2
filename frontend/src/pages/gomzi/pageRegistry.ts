import type { ComponentType } from 'react';
import type { PageProps } from './PageElements';
import AboutUsPage from './AboutUsPage';
import HealthCategoriesPage from './HealthCategoriesPage';
import FoodFortificationPage from './FoodFortificationPage';
import PrivateLabelServicesPage from './PrivateLabelServicesPage';
import SprayDriedFatPowderPage from './SprayDriedFatPowderPage';
import MicronutrientPremixPage from './MicronutrientPremixPage';
import ApiSupplementPremixesPage from './ApiSupplementPremixesPage';
import BulkSupplementsPage from './BulkSupplementsPage';

export const gomziPageRegistry:Record<string,ComponentType<PageProps>>={
 '/about-us':AboutUsPage,
 '/health-categories':HealthCategoriesPage,
 '/expertise/food-fortification':FoodFortificationPage,
 '/expertise/private-label-services':PrivateLabelServicesPage,
 '/expertise/spray-dried-fat-powder':SprayDriedFatPowderPage,
 '/expertise/micronutrient-vitamin-mineral-custom-premix':MicronutrientPremixPage,
 '/expertise/api-supplement-premixes':ApiSupplementPremixesPage,
 '/expertise/bulk-supplements-manufacturing':BulkSupplementsPage,
};
