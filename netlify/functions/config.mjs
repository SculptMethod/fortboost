import {json} from './_lib.mjs';
export default async()=>json({configured:Boolean(process.env.SUPABASE_URL&&process.env.SUPABASE_ANON_KEY),supabaseUrl:process.env.SUPABASE_URL||null,supabaseAnonKey:process.env.SUPABASE_ANON_KEY||null,checkoutEnabled:process.env.ENABLE_TEST_CHECKOUT==='true'&&Boolean(process.env.STRIPE_SECRET_KEY&&process.env.STRIPE_PRICE_ID)});
