<?php

/**
 * Plugin Name: ArtStudio Popup
 * Plugin URI: https://github.com/EngRidhoNet/ArtStudio-Popup
 * Description: Custom popup plugin for WordPress websites
 * Version: 1.0.0
 * Author: Ridho Aulia Rahman
 * Author URI: https://github.com/EngRidhoNet
 * License: GPL v2 or later
 * Text Domain: artstudio-popup
 */

namespace ArtStudio\Popup;

if (!defined('ABSPATH')) {
	exit;
}

// Interface for popup functionality
interface PopupInterface
{
	public function init();
	public function register_post_type();
	public function register_rest_routes();
}

// Trait for utility functions
trait PopupUtility
{
	protected function get_popup_fields()
	{
		return [
			'title' => '',
			'description' => '',
			'page' => '',
		];
	}

	protected function is_user_logged_in()
	{
		return is_user_logged_in();
	}
}

// Main plugin class
final class PopupPlugin implements PopupInterface
{
	use PopupUtility;

	private static $instance = null;

	public static function get_instance()
	{
		if (null === self::$instance) {
			self::$instance = new self();
		}
		return self::$instance;
	}

	private function __construct()
	{
		// Private constructor for singleton
	}

	public function init()
	{
		add_action('init', [$this, 'register_post_type']);
		add_action('rest_api_init', [$this, 'register_rest_routes']);
		add_action('wp_enqueue_scripts', [$this, 'enqueue_scripts']);
	}

	public function register_post_type()
	{
		$labels = [
			'name' => __('Popups', 'artstudio-popup'),
			'singular_name' => __('Popup', 'artstudio-popup'),
			'add_new' => __('Add New', 'artstudio-popup'),
			'add_new_item' => __('Add New Popup', 'artstudio-popup'),
			'edit_item' => __('Edit Popup', 'artstudio-popup'),
			'new_item' => __('New Popup', 'artstudio-popup'),
			'view_item' => __('View Popup', 'artstudio-popup'),
			'search_items' => __('Search Popups', 'artstudio-popup'),
			'not_found' => __('No popups found', 'artstudio-popup'),
			'not_found_in_trash' => __('No popups found in Trash', 'artstudio-popup'),
		];

		$args = [
			'labels' => $labels,
			'public' => true,
			'show_ui' => true,
			'show_in_menu' => true,
			'query_var' => true,
			'rewrite' => ['slug' => 'popup'],
			'capability_type' => 'post',
			'has_archive' => false,
			'hierarchical' => false,
			'menu_position' => 20,
			'supports' => ['title', 'editor'],
			'show_in_rest' => true,
		];

		register_post_type('popup', $args);
	}

	public function register_rest_routes()
	{
		register_rest_route('artistudio/v1', '/popup', [
			'methods' => 'GET',
			'callback' => [$this, 'get_popups'],
			'permission_callback' => [$this, 'check_permission'],
		]);
	}

	public function check_permission()
	{
		return $this->is_user_logged_in();
	}

	public function get_popups(\WP_REST_Request $request)
	{
		$args = [
			'post_type' => 'popup',
			'posts_per_page' => -1,
			'post_status' => 'publish',
		];

		$popups = get_posts($args);
		$data = [];

		foreach ($popups as $popup) {
			$data[] = [
				'id' => $popup->ID,
				'title' => $popup->post_title,
				'description' => $popup->post_content,
				'page' => get_post_meta($popup->ID, 'popup_page', true),
			];
		}

		return new \WP_REST_Response($data, 200);
	}

	public function enqueue_scripts()
	{
		wp_enqueue_style(
			'artstudio-popup-style',
			plugins_url('assets/css/popup.css', __FILE__),
			[],
			'1.0.0'
		);

		wp_enqueue_script(
			'artstudio-popup-script',
			plugins_url('assets/js/popup.js', __FILE__),
			['wp-element'],
			'1.0.0',
			true
		);

		wp_localize_script('artstudio-popup-script', 'artStudioPopup', [
			'apiUrl' => rest_url('artistudio/v1/popup'),
			'nonce' => wp_create_nonce('wp_rest'),
		]);
	}
}

// Initialize plugin
PopupPlugin::get_instance()->init();
