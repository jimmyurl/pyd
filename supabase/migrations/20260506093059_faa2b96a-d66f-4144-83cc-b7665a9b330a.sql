
-- Roles
create type public.app_role as enum ('admin', 'user');

create table public.user_roles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  role app_role not null,
  created_at timestamptz not null default now(),
  unique (user_id, role)
);

alter table public.user_roles enable row level security;

create or replace function public.has_role(_user_id uuid, _role app_role)
returns boolean language sql stable security definer set search_path = public as $$
  select exists (select 1 from public.user_roles where user_id = _user_id and role = _role)
$$;

create policy "users can view own roles" on public.user_roles
  for select to authenticated using (auth.uid() = user_id);
create policy "admins manage roles" on public.user_roles
  for all to authenticated using (public.has_role(auth.uid(), 'admin'))
  with check (public.has_role(auth.uid(), 'admin'));

-- Programs
create table public.programs (
  id uuid primary key default gen_random_uuid(),
  position int not null default 0,
  title text not null,
  summary text not null,
  focus_areas text not null,
  outcome text not null,
  sdgs text[] not null default '{}',
  icon text not null default 'Sparkles',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
alter table public.programs enable row level security;
create policy "public read programs" on public.programs for select using (true);
create policy "admins write programs" on public.programs for all to authenticated
  using (public.has_role(auth.uid(),'admin')) with check (public.has_role(auth.uid(),'admin'));

-- Impact stats
create table public.impact_stats (
  id uuid primary key default gen_random_uuid(),
  position int not null default 0,
  label text not null,
  value text not null,
  description text
);
alter table public.impact_stats enable row level security;
create policy "public read stats" on public.impact_stats for select using (true);
create policy "admins write stats" on public.impact_stats for all to authenticated
  using (public.has_role(auth.uid(),'admin')) with check (public.has_role(auth.uid(),'admin'));

-- Site content (key/value)
create table public.site_content (
  key text primary key,
  value jsonb not null,
  updated_at timestamptz not null default now()
);
alter table public.site_content enable row level security;
create policy "public read content" on public.site_content for select using (true);
create policy "admins write content" on public.site_content for all to authenticated
  using (public.has_role(auth.uid(),'admin')) with check (public.has_role(auth.uid(),'admin'));

-- Contact messages
create table public.contact_messages (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  subject text,
  message text not null,
  created_at timestamptz not null default now(),
  read boolean not null default false
);
alter table public.contact_messages enable row level security;
create policy "anyone can submit" on public.contact_messages for insert with check (true);
create policy "admins read messages" on public.contact_messages for select to authenticated
  using (public.has_role(auth.uid(),'admin'));
create policy "admins update messages" on public.contact_messages for update to authenticated
  using (public.has_role(auth.uid(),'admin'));
create policy "admins delete messages" on public.contact_messages for delete to authenticated
  using (public.has_role(auth.uid(),'admin'));

-- Seed programs
insert into public.programs (position, title, summary, focus_areas, outcome, sdgs, icon) values
(1,'Skills and Ideas Development for Livelihoods','Practical, market-relevant training that equips participants with skills aligned to real economic opportunities and evolving labor market needs.','Digital skills, vocational skills, business basics, employability skills','Participants gain competencies that directly support sustainable livelihood pathways','{"SDG 4","SDG 8"}','GraduationCap'),
(2,'Entrepreneurship & Business Development','We support youth and young mothers to start and grow small enterprises through structured mentorship, training, and practical business development support.','Business planning, financial literacy, enterprise growth, mentorship','Increased business creation and improved sustainability of enterprises','{"SDG 8","SDG 5"}','Rocket'),
(3,'Market Linkages & Economic Opportunities','We connect participants to markets, networks, and real economic opportunities that enable active participation in the economy.','Market access, partnerships, economic ecosystem engagement','Participants transition from training to income-generating activities','{"SDG 8","SDG 10"}','Network'),
(4,'Financial & Digital Inclusion','We enhance access to financial systems and digital tools that support business growth, resilience, and participation in modern economic systems.','Financial literacy, digital tools, access to platforms','Improved financial capability and expanded economic participation','{"SDG 1","SDG 5"}','Smartphone'),
(5,'Targeted Support for Young Mothers','We design inclusive and flexible programs that address structural barriers faced by young mothers, enabling their full participation in economic activities.','Flexible learning, peer networks, tailored livelihood pathways','Increased participation, economic independence, and household resilience','{"SDG 5","SDG 3"}','HeartHandshake');

-- Seed impact stats
insert into public.impact_stats (position,label,value,description) values
(1,'Youth Reached','58,755+','through training and empowerment initiatives'),
(2,'Entrepreneurs Supported','18,503+','in entrepreneurship and livelihood pathways'),
(3,'Young Mothers','Growing','inclusion in economic programs'),
(4,'Sustainable Livelihoods','Rising','number of participants transitioning'); 

-- Seed site content
insert into public.site_content (key,value) values
('hero', '{"eyebrow":"Power of Youth Development","title":"From skills to sustainable livelihoods.","subtitle":"A youth-led NGO in Mwanza, Tanzania connecting ideas, skills, and markets — moving young people and young mothers from training to real economic participation.","cta_primary":"Explore Programs","cta_secondary":"Partner With Us"}'::jsonb),
('contact', '{"email":"info@pyd.or.tz","phone":"+255 000 000 000","address":"Mwanza, Tanzania"}'::jsonb);
