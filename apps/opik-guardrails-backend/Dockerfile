FROM nvidia/cuda:12.1.1-cudnn8-runtime-ubuntu22.04

# Set environment variables
ENV PYTHONUNBUFFERED=1 \
    DEBIAN_FRONTEND=noninteractive \
    TZ=UTC \
    OPIK_GUARDRAILS_DEVICE=cuda:0

# Install Python and other dependencies
RUN apt-get update && apt-get install -y --no-install-recommends \
    python3.10 \
    python3-pip \
    python3-dev \
    tini \
    && rm -rf /var/lib/apt/lists/*

# Set Python aliases
RUN ln -sf /usr/bin/python3.10 /usr/bin/python && \
    ln -sf /usr/bin/python3.10 /usr/bin/python3

WORKDIR /opt/opik-guardrails-backend

COPY requirements.txt .
RUN pip install -r requirements.txt

# Download spaCy model for PII detection
RUN python -m spacy download en_core_web_lg

# Download transformer model for restricted topic validation
RUN python -c "from transformers import AutoModelForSequenceClassification, AutoTokenizer; AutoModelForSequenceClassification.from_pretrained('facebook/bart-large-mnli'); AutoTokenizer.from_pretrained('facebook/bart-large-mnli')"

COPY opik_guardrails ./opik_guardrails
COPY entrypoint.sh .

ARG OPIK_VERSION
ENV OPIK_VERSION="${OPIK_VERSION}"

# Set CUDA related environment variables
ENV NVIDIA_VISIBLE_DEVICES=all \
    NVIDIA_DRIVER_CAPABILITIES=compute,utility \
    TORCH_CUDA_ARCH_LIST="7.0;7.5;8.0;8.6;9.0"

RUN chmod u+x entrypoint.sh
EXPOSE 5000

ENTRYPOINT ["tini", "--"]
CMD ["./entrypoint.sh"]
