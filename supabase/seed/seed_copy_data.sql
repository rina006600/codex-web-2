insert into public.copy_pattern_rules (pattern_type, rule_description, required_tokens, channel_tone_map, priority)
values
  ('brand_mention', '브랜드명을 첫 문장에 노출하고 target 또는 feature를 자연스럽게 연결', '["brand", "target"]'::jsonb, '{"sns":"감성형","banner":"직관형","landing":"신뢰형"}'::jsonb, 1),
  ('problem_solution', '고객의 고민을 짚고 brand/feature로 해결책 제시', '["situation", "feature"]'::jsonb, '{"sns":"공감형","banner":"해결형","landing":"설득형"}'::jsonb, 2),
  ('social_proof', '수치/후기/검증 키워드로 신뢰 형성', '["brand", "benefit"]'::jsonb, '{"sns":"현실형","banner":"증거형","landing":"신뢰형"}'::jsonb, 3),
  ('benefit_emphasis', '혜택을 가장 앞쪽에 배치해 클릭 동기 강화', '["benefit"]'::jsonb, '{"sns":"즉시형","banner":"강조형","landing":"전환형"}'::jsonb, 4),
  ('scarcity_cta', '기간 한정/수량 한정 표현과 CTA를 결합', '["benefit", "situation"]'::jsonb, '{"sns":"행동유도형","banner":"긴급형","landing":"마감형"}'::jsonb, 5)
on conflict (pattern_type)
do update set
  rule_description = excluded.rule_description,
  required_tokens = excluded.required_tokens,
  channel_tone_map = excluded.channel_tone_map,
  priority = excluded.priority,
  updated_at = now();

insert into public.copy_templates (channel, pattern_type, tone_label, template_text, variables, priority)
values
  ('sns', 'brand_mention', '감성형', '{brand}, {target}를 위한 순간. {feature}로 {benefit}을 지금 경험해보세요.', '["brand","target","feature","benefit"]'::jsonb, 1),
  ('sns', 'problem_solution', '공감형', '{target}의 고민: {situation}. {brand}의 {feature}로 {benefit}까지 한 번에.', '["target","situation","brand","feature","benefit"]'::jsonb, 1),
  ('sns', 'social_proof', '현실형', '{brand} 선택 이유? {target} 사용자들이 {feature} 덕분에 {benefit}을 체감했어요.', '["brand","target","feature","benefit"]'::jsonb, 1),
  ('sns', 'benefit_emphasis', '즉시형', '지금 시작하면 {benefit}. {brand}의 {feature}로 {situation}을 더 쉽게.', '["benefit","brand","feature","situation"]'::jsonb, 1),
  ('sns', 'scarcity_cta', '행동유도형', '{situation} 기간 한정! {brand} {feature}, {benefit} 혜택은 오늘 마감. 지금 클릭!', '["situation","brand","feature","benefit"]'::jsonb, 1),
  ('banner', 'brand_mention', '직관형', '{brand} | {target} 맞춤 | {benefit}', '["brand","target","benefit"]'::jsonb, 1),
  ('banner', 'problem_solution', '해결형', '{situation}? {brand} {feature}로 해결. {benefit}', '["situation","brand","feature","benefit"]'::jsonb, 1),
  ('banner', 'social_proof', '증거형', '{target}가 선택한 {brand} · {feature} · {benefit}', '["target","brand","feature","benefit"]'::jsonb, 1),
  ('banner', 'benefit_emphasis', '강조형', '{benefit} 지금 적용! {brand} {feature}', '["benefit","brand","feature"]'::jsonb, 1),
  ('banner', 'scarcity_cta', '긴급형', '오늘만 {benefit} · {brand} 바로 시작', '["benefit","brand"]'::jsonb, 1),
  ('landing', 'brand_mention', '신뢰형', '{brand}는 {target}를 위해 설계되었습니다. {feature} 기반으로 {benefit}을 제공합니다.', '["brand","target","feature","benefit"]'::jsonb, 1),
  ('landing', 'problem_solution', '설득형', '{situation}에서 겪는 문제를 {brand}의 {feature}가 해결하고, 결과적으로 {benefit}을 만듭니다.', '["situation","brand","feature","benefit"]'::jsonb, 1),
  ('landing', 'social_proof', '신뢰형', '{target} 고객들이 {brand}를 선택한 이유는 {feature}입니다. 실제로 {benefit} 성과를 확인했습니다.', '["target","brand","feature","benefit"]'::jsonb, 1),
  ('landing', 'benefit_emphasis', '전환형', '{benefit}을 가장 빠르게 실현하고 싶다면 {brand}를 선택하세요. {feature}가 전환을 돕습니다.', '["benefit","brand","feature"]'::jsonb, 1),
  ('landing', 'scarcity_cta', '마감형', '{situation} 한정 혜택으로 {benefit}을 제공합니다. 마감 전에 {brand} {feature}를 지금 시작하세요.', '["situation","benefit","brand","feature"]'::jsonb, 1);
