<template>
    <div class="block-style card-wrapper">
        <div class="img-block">
            <img src="/placeholder.png">
            <div class="header">
                Topic of all time
            </div>
            <div class="dim" />
        </div>

        <hr>
        
        <div class="author-block standalone">
            <div class="author-fname">by John Doe</div>
            <hr>
            <div class="time">Just now</div>
        </div>

        <div class="description">
            <div class="text">
                <div class="first-letter">L</div>orem ipsum dolor sit amet consectetur adipisicing elit. At, eligendi ex. Repudiandae neque magni quasi dolore natus blanditiis dicta beatae inventore ullam consequatur quo, autem totam praesentium debitis sapiente cupiditate?
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium ea totam, est necessitatibus neque explicabo sapiente aspernatur nisi cum beatae nostrum quod nam consequatur, aliquam saepe reprehenderit odit atque distinctio!
                Lorem ipsum dolor sit amet consectetur adipisicing elit. </div>
            <div class="text">Provident, repudiandae rem similique molestiae voluptatum officiis ullam quod adipisci molestias vel corporis libero odio quia architecto, placeat perspiciatis natus recusandae possimus?
            </div>
        </div>

        <div class="link-wrapper">
            <GotoLink :linkTo="`/`" />
        </div>
    </div>

    <div class="block-style card-wrapper">
        <div class="headless-header">
            Topic of all time
        </div>

        <div class="description">
            <div class="text">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. At, eligendi ex. Repudiandae neque magni quasi.
            </div>
        </div>

        <div class="link-wrapper">
            <GotoLink :linkTo="`/`">
                <div class="author-block">
                    <div class="author-fname">by John Doe</div>
                    •
                    <div class="time">Just now</div>
                </div>
            </GotoLink>
        </div>
    </div>
</template>

<script lang="ts" setup>
import GotoLink from '../uiElements/GotoLink.vue';
</script>

<style lang="scss" scoped>
.card-wrapper {
    width: 100%;

    .headless-header {
        font-size: 40px;
        font-weight: 600;
        padding: 10px 15px 0 15px;
    }

    .img-block {
        overflow: hidden;
        border-top-left-radius: 15px;
        border-top-right-radius: 15px;
        height: 300px;
        position: relative;

        &.no-img {
            height: 300px;
            background: linear-gradient(
                to bottom,
                #dcd8d8 0%,
                #adadad 100%
            );
        }

        img {
            width: 100%;
            object-fit: cover;
        }

        .header {
            font-size: 40px;
            font-weight: 600;
            position: absolute;
            color: white;
            bottom: 5px;
            left: 10px;
            z-index: 2;
        }
        
        .dim {
            position: absolute;
            bottom: 0px;
            left: 0;
            width: 100%;
            height: 300px;
            background: linear-gradient(
                to top,
                var(--dim-gradient-color) 0%,
                transparent
            );
        }
    }

    .author-block {
        display: flex;
        justify-content: start;
        justify-content: center;
        align-items: center;
        color: var(--color-dim);
        gap: 10px;

        &.standalone {
            padding: 8px 15px;
        }
        
        hr {
            flex: 1 1 auto;
        }

        .author-fname {
            font-size: 13px;
            font-weight: 500;
        }

        .time {
            font-size: 13px;
            font-weight: 500;
        }
    }

    .description {
        display: flex;
        flex-direction: column;
        padding: 0px 15px;
        font-size: 16px;
        line-height: 1.5;
        gap: 9px;

        .text {
            margin: 0;
            padding: 0;

            .first-letter {
                float: left;
                font-size: 3em;
                line-height: 1;
                margin-right: 8px;
                font-weight: bold;
            }
        }
    }

    .link-wrapper {
        padding: 0 15px 10px;
    }
}
</style>