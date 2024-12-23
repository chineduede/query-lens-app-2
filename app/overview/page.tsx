'use client';

import React from "react";
import {
  ArrowDown,
  Database,
  FileSearch,
  Shield,
  Brain,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from "../components/Card";

const CodeBlock = ({ children }: { children: React.ReactNode }) => (
  <pre className="bg-gray-100 p-4 rounded-lg overflow-x-auto">
    <code className="text-sm">{children}</code>
  </pre>
);

const ProcessStep = ({
  icon,
  title,
  description,
  color,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  color: string;
}) => {
  return (
    <div className="flex items-start space-x-4">
      <div className={`${color} p-2 rounded-lg`}>{icon}</div>
      <div>
        <h3 className="font-medium">{title}</h3>
        <p className="text-sm text-gray-600">{description}</p>
      </div>
    </div>
  );
};

const ExpandableSection = ({
  title,
  children,
  defaultExpanded = false,
}: {
  title: string;
  children: React.ReactNode;
  defaultExpanded?: boolean;
}) => {
  const [isExpanded, setIsExpanded] = React.useState(defaultExpanded);

  return (
    <div className="border rounded-lg mb-4">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex justify-between items-center p-4 bg-gray-50 hover:bg-gray-100"
      >
        <h3 className="font-medium text-lg">{title}</h3>
        {isExpanded ? <ChevronUp /> : <ChevronDown />}
      </button>
      {isExpanded && <div className="p-4">{children}</div>}
    </div>
  );
};

export default function Overview() {
  const technicalDetails = {
    logCollection: (
      <div className="space-y-4">
        <h4 className="font-semibold">Decision:</h4>
        <p>Use audit logs as the primary data source</p>

        <h4 className="font-semibold">Alternatives:</h4>
        <ul className="list-disc pl-6 space-y-2">
          <li>Performance Schema</li>
          <li>General Query Log</li>
          <li>Slow Query Log</li>
          <li>Binary Log</li>
        </ul>

        <h4 className="font-semibold">Rationale:</h4>
        <p>
          Audit logs provide the most comprehensive and reliable source of query
          information without impacting database performance. They capture all
          SQL statements with minimal overhead and include essential metadata.
        </p>
      </div>
    ),
    processing: (
      <div className="space-y-4">
        <h4 className="font-semibold">Decision:</h4>
        <p>Implement query clustering with Athena-based processing</p>

        <h4 className="font-semibold">Alternatives:</h4>
        <ul className="list-disc pl-6 space-y-2">
          <li>Direct log parsing</li>
          <li>Stream processing</li>
          <li>Local batch processing</li>
        </ul>

        <h4 className="font-semibold">Rationale:</h4>
        <p>
          RDS instances typically generate millions of queries, with many
          duplicates or variations. Athena-based clustering provides efficient
          processing while maintaining temporal order and query patterns.
        </p>
      </div>
    ),
    privacy: (
      <div className="space-y-4">
        <h4 className="font-semibold">Decision:</h4>
        <p>Implement comprehensive SQL parsing and obfuscation</p>

        <h4 className="font-semibold">Alternatives:</h4>
        <ul className="list-disc pl-6 space-y-2">
          <li>Regex-based replacement</li>
          <li>Hash-based anonymization</li>
          <li>Token-based masking</li>
        </ul>

        <h4 className="font-semibold">Rationale:</h4>
        <p>
          PII/sensitive data isn't needed for compatibility analysis. Removing
          it enables secure query sharing across teams and environments while
          maintaining query structure integrity.
        </p>
      </div>
    ),
    aiAnalysis: (
      <div className="space-y-4">
        <h4 className="font-semibold">Decision:</h4>
        <p>Implement multi-model waterfall approach with tiered capabilities</p>

        <h4 className="font-semibold">Alternatives:</h4>
        <ul className="list-disc pl-6 space-y-2">
          <li>Single model approach</li>
          <li>Rule-based analysis</li>
          <li>Pattern matching</li>
        </ul>

        <h4 className="font-semibold">Rationale:</h4>
        <p>
          Different queries require different levels of analysis. The waterfall
          approach optimizes for both accuracy and cost, using more capable
          models only when necessary.
        </p>
      </div>
    ),
  };

  const steps = [
    {
      title: "Fetch RDS audit logs",
      description: "Identifies and fetches query logs from RDS instances",
    },
    {
      title: "Identify query patterns",
      description:
        "Uses AI to analyze and categorize query patterns in your application",
    },
    {
      title: "Secure sensitive info",
      description:
        "Automatically detects and redacts sensitive information from queries",
    },
    {
      title: "Evaluate compatibility",
      description: "Assesses query compatibility with target database versions",
    },
  ];

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-12 gap-6">
          {/* First column - 70% */}
          <div className="col-span-8">
            <div className="space-y-8">
              <section>
                <h2 className="text-2xl font-bold mb-4">
                  The Migration Dilemma
                </h2>
                <p className="mb-6">
                  There are many compelling benefits to running on the latest
                  database versions, including avoiding AWS end-of-life
                  surcharges, gaining access to IO-optimized instance options,
                  taking advantage of cost-optimized pricing tiers, and
                  receiving critical security patches. However, organizations
                  often hesitate to upgrade due to the inherent fear that
                  existing business logic, particularly complex SQL queries that
                  power critical applications, might break in subtle ways on
                  newer versions. This creates a tension between wanting to
                  modernize and fear of disrupting business operations.
                </p>
                <p>
                  QueryLens addresses this challenge by leveraging Large
                  Language Models to automatically analyze SQL query patterns
                  and evaluate compatibility across versions. By processing
                  anonymized query logs through a sophisticated AI pipeline, it
                  can identify which queries are fully compatible with target
                  database versions, which might need minor modifications, and
                  which could be problematic. This automated analysis gives
                  teams the confidence to plan and execute database upgrades
                  with a clear understanding of potential impacts, turning an
                  uncertain migration into a well-understood, manageable
                  project.
                </p>
              </section>
            </div>
          </div>

          {/* Second column - 30% */}
          <div className="col-span-4">
            <Card className="h-full">
              <CardHeader>
                <CardTitle>Processing Pipeline</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 flex flex-col justify-between h-[calc(100%-4rem)]">
                <ProcessStep
                  icon={<Database className="h-6 w-6" />}
                  title="Log Collection"
                  description="Fetch RDS audit logs"
                  color="bg-blue-500"
                />
                <ArrowDown className="mx-auto text-gray-400" />
                <ProcessStep
                  icon={<FileSearch className="h-6 w-6" />}
                  title="Processing & Clustering"
                  description="Identify query patterns"
                  color="bg-green-500"
                />
                <ArrowDown className="mx-auto text-gray-400" />
                <ProcessStep
                  icon={<Shield className="h-6 w-6" />}
                  title="Data Privacy"
                  description="Secure sensitive info"
                  color="bg-purple-500"
                />
                <ArrowDown className="mx-auto text-gray-400" />
                <ProcessStep
                  icon={<Brain className="h-6 w-6" />}
                  title="AI Analysis"
                  description="Evaluate compatibility"
                  color="bg-orange-500"
                />
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Full Width Sections */}
        <div className="mt-12 space-y-4">
          <ExpandableSection title="Database Support" defaultExpanded={false}>
            <Card>
              <CardContent className="prose max-w-none">
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold">1. Aurora MySQL</h3>
                    <ul className="list-disc pl-6">
                      <li>Native audit log integration via CloudWatch</li>
                      <li>
                        Efficient CSV-format parsing with field validation
                      </li>
                      <li>Handles both single and multi-line queries</li>
                      <li>Supports all MySQL-specific syntax variations</li>
                      <li>
                        Automatic version detection and compatibility rules
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold">
                      2. Aurora PostgreSQL
                    </h3>
                    <ul className="list-disc pl-6">
                      <li>Direct AUDIT log processing</li>
                      <li>Structured log parsing with timestamp correlation</li>
                      <li>Full support for PostgreSQL-specific features</li>
                      <li>Transaction boundary detection</li>
                      <li>Schema-aware analysis</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold">
                      3. Query Clustering
                    </h3>
                    <ul className="list-disc pl-6">
                      <li>
                        Groups similar queries using Athena for efficiency
                      </li>
                      <li>The batch size of 10,000 queries</li>
                      <li>
                        Deduplicates identical queries while preserving counts
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold">4. Data Privacy</h3>
                    <ul className="list-disc pl-6">
                      <li>Comprehensive SQL parsing and obfuscation</li>
                      <li>Replaces literals with type-safe placeholders</li>
                      <li>Preserves query structure for analysis</li>
                      <li>Handles complex nested queries</li>
                      <li>Maintains compliance with data protection rules</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold">
                      Processing Pipeline
                    </h3>
                    <p>The system processes logs in three phases:</p>
                    <ol className="list-decimal pl-6">
                      <li>Extract: Pull raw logs from RDS instances</li>
                      <li>Transform: Parse, cluster, and obfuscate queries</li>
                      <li>Load: Store processed data for analysis</li>
                    </ol>
                    <p className="mt-4">
                      All operations are fully asynchronous with automatic
                      retries and backoff strategies to handle rate limits and
                      throttling.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </ExpandableSection>

          <ExpandableSection
            title="AI Evaluation Features"
            defaultExpanded={false}
          >
            <Card>
              <CardContent className="prose max-w-none">
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold">
                      1. Perplexity (Primary Model)
                    </h3>
                    <ul className="list-disc pl-6">
                      <li>Uses llama-3.1-sonar-huge-128k-online</li>
                      <li>Rate limited to 50 requests/second</li>
                      <li>Temperature set to 0 for deterministic outputs</li>
                      <li>Cached responses using SQLite for efficiency</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold">
                      2. Claude-3-Sonnet (Secondary Model)
                    </h3>
                    <ul className="list-disc pl-6">
                      <li>
                        Uses anthropic.claude-3-5-sonnet-20240620-v1:0 via AWS
                        Bedrock
                      </li>
                      <li>Rate limited to 50 requests/second</li>
                      <li>Maximum context of 4000 tokens</li>
                      <li>Specialized prompt template for SQL analysis</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold">
                      3. GPT-4 (Tertiary Model)
                    </h3>
                    <ul className="list-disc pl-6">
                      <li>
                        Uses latest GPT-4 models including gpt-4o-2024-08-06
                      </li>
                      <li>Rate limited to 1000 requests/second</li>
                      <li>Maximum output of 4000 tokens</li>
                      <li>5 retries on failure</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold">
                      4. Unified Scoring Pipeline
                    </h3>
                    <ul className="list-disc pl-6">
                      <li>
                        Binary scoring system:
                        <ul className="list-disc pl-6 mt-2">
                          <li>1.0 for exact match</li>
                          <li>
                            0.5 for "MOSTLY COMPATIBLE" when expected is
                            "COMPATIBLE"
                          </li>
                          <li>0.0 for incorrect matches</li>
                        </ul>
                      </li>
                      <li>Results tracked in Langfuse for monitoring</li>
                      <li>
                        Caching via SQLite to prevent duplicate evaluations
                      </li>
                      <li>Parallel processing with configurable batch sizes</li>
                    </ul>
                  </div>

                  <p className="mt-4">
                    The system uses a unified API layer with automatic rate
                    limiting, retries, and caching. All evaluations are tracked
                    in Langfuse for monitoring and improvement.
                  </p>
                </div>
              </CardContent>
            </Card>
          </ExpandableSection>
        </div>
      </div>
    </div>
  );
};
