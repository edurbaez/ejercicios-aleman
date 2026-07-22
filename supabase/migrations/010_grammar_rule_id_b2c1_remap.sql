-- Remap grammar_rule_progress.rule_id after splitting B2/C1 grammar rules
-- (grammar-data-b2.js / grammar-data-c1.js went from 10 rules each to 17,
-- following the chapter granularity of "Grammatik aktiv B2/C1", Cornelsen).
-- Existing SRS progress rows must follow their rule to its new id, or the
-- user's progress silently stops matching any current rule.
--
-- b2-01/02 and c1-01/02/05/06 keep their id (no rename needed).
-- The 14 brand-new rule ids (b2-03/05/06/09/12/13/14, c1-03/08/10/11/12/13/17)
-- have no prior rows to migrate.

UPDATE grammar_rule_progress SET rule_id = CASE rule_id
  WHEN 'b2-05' THEN 'b2-04'
  WHEN 'b2-09' THEN 'b2-10'
  WHEN 'b2-10' THEN 'b2-11'
  WHEN 'b2-03' THEN 'b2-07'
  WHEN 'b2-04' THEN 'b2-08'
  WHEN 'b2-06' THEN 'b2-15'
  WHEN 'b2-07' THEN 'b2-16'
  WHEN 'b2-08' THEN 'b2-17'
  WHEN 'c1-03' THEN 'c1-04'
  WHEN 'c1-04' THEN 'c1-14'
  WHEN 'c1-07' THEN 'c1-09'
  WHEN 'c1-08' THEN 'c1-07'
  WHEN 'c1-09' THEN 'c1-15'
  WHEN 'c1-10' THEN 'c1-16'
  ELSE rule_id
END
WHERE rule_id IN (
  'b2-03', 'b2-04', 'b2-05', 'b2-06', 'b2-07', 'b2-08', 'b2-09', 'b2-10',
  'c1-03', 'c1-04', 'c1-07', 'c1-08', 'c1-09', 'c1-10'
);
