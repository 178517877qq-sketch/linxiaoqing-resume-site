-- Sample view used to keep official values and analytical labels separate.
-- Expected source table: ecommerce_yearly_fact
-- Official comparable growth must come from the NBS release; do not derive it
-- by dividing adjacent published totals because the covered platform set changes.
CREATE VIEW vw_ecommerce_trend_2021_2025 AS
SELECT
  year,
  online_shopping_users_100m,
  online_shopping_usage_pct,
  cnnic_report,
  online_retail_sales_trillion_cny,
  official_comparable_yoy_pct,
  physical_goods_online_share_pct,
  CASE
    WHEN year = 2023 THEN 'five_year_peak_physical_online_share'
    WHEN year = 2025 THEN 'user_count_down_sales_up_not_directly_comparable'
    ELSE 'annual_observation'
  END AS analysis_label
FROM ecommerce_yearly_fact
WHERE year BETWEEN 2021 AND 2025;
